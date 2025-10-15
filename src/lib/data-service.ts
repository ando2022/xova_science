import { createClient } from '@supabase/supabase-js';
import { SmoothieRecipe, NutritionalProfile } from './smoothie-generator';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Order {
  id?: string;
  user_id: string;
  order_number?: string;
  order_date: string;
  delivery_date?: string;
  plan_type: 'first-order' | 'weekly';
  smoothie_ids: string[];
  total_amount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'completed' | 'failed';
  delivery_address?: string;
  notes?: string;
}

export interface UserEvent {
  user_id: string | null;
  event_type: string;
  event_data: any;
  created_at?: string;
}

export class DataService {
  /**
   * Save generated smoothie recipes to database
   */
  static async saveSmoothieRecipes(userId: string, recipes: SmoothieRecipe[]): Promise<boolean> {
    try {
      console.log(`Saving ${recipes.length} smoothie recipes for user ${userId}...`);
      
      const recipesToSave = recipes.map(recipe => ({
        user_id: userId,
        name: recipe.name,
        tier: recipe.tier,
        flavor_profile: recipe.flavor_profile,
        ingredients: recipe.ingredients,
        nutritional_breakdown: recipe.nutritional_breakdown,
        health_benefits: recipe.health_benefits,
        scientific_rationale: recipe.scientific_rationale,
        preparation_instructions: recipe.preparation_instructions,
        price_seven_day: recipe.price.seven_day,
        price_fourteen_day: recipe.price.fourteen_day,
        generated_at: new Date().toISOString()
      }));

      const { error } = await supabase
        .from('smoothie_recipes')
        .insert(recipesToSave);

      if (error) {
        console.error('Error saving smoothie recipes:', error);
        return false;
      }

      console.log('✅ Smoothie recipes saved successfully');
      return true;
    } catch (error) {
      console.error('Error in saveSmoothieRecipes:', error);
      return false;
    }
  }

  /**
   * Save user's nutritional profile analysis
   */
  static async saveNutritionalProfile(userId: string, profile: NutritionalProfile): Promise<boolean> {
    try {
      console.log('Saving nutritional profile for user', userId);
      
      const { error } = await supabase
        .from('user_profiles')
        .update({
          daily_targets: profile.daily_targets,
          priority_nutrients: profile.priority_nutrients,
          scientific_rationale: profile.scientific_rationale,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (error) {
        console.error('Error saving nutritional profile:', error);
        return false;
      }

      console.log('✅ Nutritional profile saved successfully');
      return true;
    } catch (error) {
      console.error('Error in saveNutritionalProfile:', error);
      return false;
    }
  }

  /**
   * Create an order
   */
  static async createOrder(order: Order): Promise<{ success: boolean; orderId?: string; orderNumber?: string }> {
    try {
      console.log('Creating order:', order);
      
      const { data, error } = await supabase
        .from('orders')
        .insert({
          user_id: order.user_id,
          order_date: order.order_date,
          delivery_date: order.delivery_date,
          plan_type: order.plan_type,
          smoothie_ids: order.smoothie_ids,
          total_amount: order.total_amount,
          status: order.status,
          payment_status: order.payment_status,
          delivery_address: order.delivery_address,
          notes: order.notes
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating order:', error);
        return { success: false };
      }

      console.log('✅ Order created successfully:', data);
      
      // Log order creation event
      await this.logEvent({
        user_id: order.user_id,
        event_type: 'order_created',
        event_data: {
          order_id: data.id,
          order_number: data.order_number,
          plan_type: order.plan_type,
          total_amount: order.total_amount,
          smoothie_count: order.smoothie_ids.length
        }
      });

      return {
        success: true,
        orderId: data.id,
        orderNumber: data.order_number
      };
    } catch (error) {
      console.error('Error in createOrder:', error);
      return { success: false };
    }
  }

  /**
   * Get user's orders
   */
  static async getUserOrders(userId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('order_date', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getUserOrders:', error);
      return [];
    }
  }

  /**
   * Get user's smoothie recipes
   */
  static async getUserSmoothieRecipes(userId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('smoothie_recipes')
        .select('*')
        .eq('user_id', userId)
        .order('generated_at', { ascending: false });

      if (error) {
        console.error('Error fetching smoothie recipes:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getUserSmoothieRecipes:', error);
      return [];
    }
  }

  /**
   * Log user event
   */
  static async logEvent(event: UserEvent): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_events')
        .insert({
          user_id: event.user_id,
          event_type: event.event_type,
          event_data: event.event_data,
          created_at: event.created_at || new Date().toISOString()
        });

      if (error) {
        console.error('Error logging event:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in logEvent:', error);
      return false;
    }
  }

  /**
   * Track smoothie view
   */
  static async trackSmoothieView(userId: string | null, smoothieId: string, smoothieName: string): Promise<void> {
    await this.logEvent({
      user_id: userId,
      event_type: 'smoothie_viewed',
      event_data: {
        smoothie_id: smoothieId,
        smoothie_name: smoothieName,
        timestamp: new Date().toISOString()
      }
    });
  }

  /**
   * Track smoothie selection
   */
  static async trackSmoothieSelection(userId: string, smoothieId: string, smoothieName: string, tier: string): Promise<void> {
    await this.logEvent({
      user_id: userId,
      event_type: 'smoothie_selected',
      event_data: {
        smoothie_id: smoothieId,
        smoothie_name: smoothieName,
        tier: tier,
        timestamp: new Date().toISOString()
      }
    });
  }

  /**
   * Track filter usage
   */
  static async trackFilterUsage(userId: string | null, filterType: string): Promise<void> {
    await this.logEvent({
      user_id: userId,
      event_type: 'filter_used',
      event_data: {
        filter_type: filterType,
        timestamp: new Date().toISOString()
      }
    });
  }

  /**
   * Track plan type change
   */
  static async trackPlanTypeChange(userId: string, planType: 'first-order' | 'weekly'): Promise<void> {
    await this.logEvent({
      user_id: userId,
      event_type: 'plan_type_changed',
      event_data: {
        plan_type: planType,
        timestamp: new Date().toISOString()
      }
    });
  }

  /**
   * Track questionnaire completion
   */
  static async trackQuestionnaireCompletion(userId: string, profile: any): Promise<void> {
    await this.logEvent({
      user_id: userId,
      event_type: 'questionnaire_completed',
      event_data: {
        health_goals: profile.health_goals,
        activity_level: profile.activity_level,
        dietary_restrictions: profile.dietary_restrictions,
        timestamp: new Date().toISOString()
      }
    });
  }

  /**
   * Track checkout started
   */
  static async trackCheckoutStarted(userId: string, selectedSmoothies: any[], planType: string, totalAmount: number): Promise<void> {
    await this.logEvent({
      user_id: userId,
      event_type: 'checkout_started',
      event_data: {
        smoothie_count: selectedSmoothies.length,
        plan_type: planType,
        total_amount: totalAmount,
        smoothie_ids: selectedSmoothies.map(s => s.id),
        timestamp: new Date().toISOString()
      }
    });
  }

  /**
   * Get user analytics summary
   */
  static async getUserAnalytics(userId: string): Promise<any> {
    try {
      // Get all user events
      const { data: events, error: eventsError } = await supabase
        .from('user_events')
        .select('*')
        .eq('user_id', userId);

      if (eventsError) {
        console.error('Error fetching user events:', error);
        return null;
      }

      // Get orders
      const orders = await this.getUserOrders(userId);

      // Get smoothie recipes
      const recipes = await this.getUserSmoothieRecipes(userId);

      return {
        total_events: events?.length || 0,
        total_orders: orders.length,
        total_recipes_generated: recipes.length,
        events_by_type: this.groupEventsByType(events || []),
        recent_events: events?.slice(0, 10) || []
      };
    } catch (error) {
      console.error('Error in getUserAnalytics:', error);
      return null;
    }
  }

  /**
   * Helper: Group events by type
   */
  private static groupEventsByType(events: any[]): Record<string, number> {
    return events.reduce((acc, event) => {
      acc[event.event_type] = (acc[event.event_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  /**
   * Get all analytics for admin dashboard
   */
  static async getAdminAnalytics(): Promise<any> {
    try {
      // Get total users
      const { count: totalUsers } = await supabase
        .from('user_profiles')
        .select('*', { count: 'exact', head: true });

      // Get total orders
      const { count: totalOrders } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true });

      // Get total revenue
      const { data: orders } = await supabase
        .from('orders')
        .select('total_amount');

      const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;

      // Get total events
      const { count: totalEvents } = await supabase
        .from('user_events')
        .select('*', { count: 'exact', head: true });

      // Get popular smoothies
      const { data: popularSmoothies } = await supabase
        .from('user_events')
        .select('event_data')
        .eq('event_type', 'smoothie_selected')
        .limit(100);

      return {
        total_users: totalUsers || 0,
        total_orders: totalOrders || 0,
        total_revenue: totalRevenue,
        total_events: totalEvents || 0,
        popular_smoothies: this.extractPopularSmoothies(popularSmoothies || [])
      };
    } catch (error) {
      console.error('Error in getAdminAnalytics:', error);
      return null;
    }
  }

  /**
   * Helper: Extract popular smoothies from events
   */
  private static extractPopularSmoothies(events: any[]): any[] {
    const smoothieCounts: Record<string, { name: string; count: number; tier: string }> = {};

    events.forEach(event => {
      const smoothieId = event.event_data?.smoothie_id;
      const smoothieName = event.event_data?.smoothie_name;
      const tier = event.event_data?.tier;

      if (smoothieId) {
        if (!smoothieCounts[smoothieId]) {
          smoothieCounts[smoothieId] = { name: smoothieName, count: 0, tier };
        }
        smoothieCounts[smoothieId].count++;
      }
    });

    return Object.entries(smoothieCounts)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }
}

export default DataService;

