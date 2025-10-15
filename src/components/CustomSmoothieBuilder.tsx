import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { 
  Plus, 
  X, 
  Sparkles, 
  ArrowLeft, 
  Save,
  Apple,
  Beaker,
  ChefHat,
  Trash2
} from 'lucide-react';
import { getCurrentUser, updateUser, type CustomSmoothie } from '../lib/mock-auth';
import { toast } from 'sonner@2.0.3';

interface CustomSmoothieBuilderProps {
  onNavigate: (page: string) => void;
}

interface Ingredient {
  name: string;
  quantity: string;
}

const COMMON_INGREDIENTS = [
  // Fruits
  { name: 'Banana', category: 'Fruit', defaultQty: '1 medium' },
  { name: 'Strawberries', category: 'Fruit', defaultQty: '1 cup' },
  { name: 'Blueberries', category: 'Fruit', defaultQty: '1/2 cup' },
  { name: 'Mango', category: 'Fruit', defaultQty: '1 cup' },
  { name: 'Pineapple', category: 'Fruit', defaultQty: '1 cup' },
  { name: 'Apple', category: 'Fruit', defaultQty: '1 medium' },
  { name: 'Avocado', category: 'Fruit', defaultQty: '1/2 medium' },
  
  // Greens
  { name: 'Spinach', category: 'Greens', defaultQty: '1 cup' },
  { name: 'Kale', category: 'Greens', defaultQty: '1 cup' },
  { name: 'Cucumber', category: 'Greens', defaultQty: '1/2 cup' },
  
  // Liquids
  { name: 'Almond Milk', category: 'Liquid', defaultQty: '250ml' },
  { name: 'Oat Milk', category: 'Liquid', defaultQty: '250ml' },
  { name: 'Coconut Water', category: 'Liquid', defaultQty: '250ml' },
  { name: 'Greek Yogurt', category: 'Liquid', defaultQty: '150g' },
  
  // Proteins & Superfoods
  { name: 'Protein Powder', category: 'Protein', defaultQty: '30g' },
  { name: 'Chia Seeds', category: 'Superfood', defaultQty: '1 tbsp' },
  { name: 'Flax Seeds', category: 'Superfood', defaultQty: '1 tbsp' },
  { name: 'Hemp Seeds', category: 'Superfood', defaultQty: '1 tbsp' },
  { name: 'Peanut Butter', category: 'Protein', defaultQty: '1 tbsp' },
  { name: 'Almond Butter', category: 'Protein', defaultQty: '1 tbsp' },
  { name: 'Spirulina', category: 'Superfood', defaultQty: '1 tsp' },
  { name: 'Cacao Powder', category: 'Superfood', defaultQty: '1 tbsp' },
  { name: 'Matcha Powder', category: 'Superfood', defaultQty: '1 tsp' }
];

const CATEGORIES = ['All', 'Fruit', 'Greens', 'Liquid', 'Protein', 'Superfood'];

export function CustomSmoothieBuilder({ onNavigate }: CustomSmoothieBuilderProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [notes, setNotes] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [customIngredientName, setCustomIngredientName] = useState('');
  const [customIngredientQty, setCustomIngredientQty] = useState('');
  const [savedSmoothies, setSavedSmoothies] = useState<CustomSmoothie[]>([]);

  // Load saved smoothies on mount
  useEffect(() => {
    const loadSavedSmoothies = async () => {
      const user = await getCurrentUser();
      if (user?.customSmoothies) {
        setSavedSmoothies(user.customSmoothies);
      }
    };
    loadSavedSmoothies();
  }, []);

  const addIngredient = (ingredientName: string, defaultQty: string) => {
    if (ingredients.find(ing => ing.name === ingredientName)) {
      toast.error('Ingredient already added');
      return;
    }
    
    setIngredients([...ingredients, { name: ingredientName, quantity: defaultQty }]);
    toast.success(`Added ${ingredientName}`);
  };

  const addCustomIngredient = () => {
    if (!customIngredientName || !customIngredientQty) {
      toast.error('Please enter ingredient name and quantity');
      return;
    }
    
    if (ingredients.find(ing => ing.name === customIngredientName)) {
      toast.error('Ingredient already added');
      return;
    }
    
    setIngredients([...ingredients, { name: customIngredientName, quantity: customIngredientQty }]);
    setCustomIngredientName('');
    setCustomIngredientQty('');
    toast.success(`Added ${customIngredientName}`);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredientQuantity = (index: number, quantity: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index].quantity = quantity;
    setIngredients(newIngredients);
  };

  const estimateMacros = () => {
    // Simple estimation based on common ingredients
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;
    let fiber = 0;

    ingredients.forEach(ing => {
      const lowerName = ing.name.toLowerCase();
      
      // Rough estimates based on common ingredients
      if (lowerName.includes('banana')) {
        calories += 105; carbs += 27; fiber += 3;
      } else if (lowerName.includes('berr')) {
        calories += 50; carbs += 12; fiber += 3;
      } else if (lowerName.includes('protein')) {
        calories += 120; protein += 25;
      } else if (lowerName.includes('milk')) {
        calories += 60; protein += 2; carbs += 8; fat += 2;
      } else if (lowerName.includes('yogurt')) {
        calories += 100; protein += 10; carbs += 6; fat += 3;
      } else if (lowerName.includes('butter')) {
        calories += 95; protein += 4; fat += 8;
      } else if (lowerName.includes('seed')) {
        calories += 60; protein += 2; fat += 5; fiber += 4;
      } else if (lowerName.includes('spinach') || lowerName.includes('kale')) {
        calories += 7; fiber += 1;
      } else {
        // Default for unknown ingredients
        calories += 50; carbs += 10;
      }
    });

    return { calories, protein, carbs, fat, fiber };
  };

  const saveSmoothie = async () => {
    if (!name) {
      toast.error('Please enter a name for your smoothie');
      return;
    }
    
    if (ingredients.length === 0) {
      toast.error('Please add at least one ingredient');
      return;
    }

    const user = await getCurrentUser();
    if (!user) {
      toast.error('Please log in to save smoothies');
      return;
    }

    const macros = estimateMacros();
    
    const newSmoothie: CustomSmoothie = {
      id: `custom-${Date.now()}`,
      name,
      description: description || 'My custom smoothie',
      ingredients,
      instructions: notes || 'Blend all ingredients until smooth',
      createdAt: new Date().toISOString(),
      nutritionEstimate: macros
    };

    const updatedSmoothies = [...(user.customSmoothies || []), newSmoothie];
    await updateUser(user.id, { customSmoothies: updatedSmoothies });
    
    setSavedSmoothies(updatedSmoothies);
    toast.success(`Saved "${name}" to your creations!`);
    
    // Reset form
    setName('');
    setDescription('');
    setIngredients([]);
    setNotes('');
  };

  const deleteSmoothie = async (smoothieId: string) => {
    const user = await getCurrentUser();
    if (!user) return;

    const updatedSmoothies = (user.customSmoothies || []).filter(s => s.id !== smoothieId);
    await updateUser(user.id, { customSmoothies: updatedSmoothies });
    
    setSavedSmoothies(updatedSmoothies);
    toast.success('Smoothie deleted');
  };

  const loadSmoothie = (smoothie: CustomSmoothie) => {
    setName(smoothie.name + ' (Copy)');
    setDescription(smoothie.description);
    setIngredients([...smoothie.ingredients]);
    setNotes(smoothie.instructions || '');
    toast.info('Loaded smoothie for editing');
  };

  const filteredIngredients = selectedCategory === 'All'
    ? COMMON_INGREDIENTS
    : COMMON_INGREDIENTS.filter(ing => ing.category === selectedCategory);

  const estimatedMacros = estimateMacros();

  return (
    <div className="min-h-screen bg-gradient-to-br from-xova-accent/3 via-background to-xova-primary/3">
      {/* Header */}
      <header className="border-b border-border/50 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-xova-accent to-xova-success rounded-2xl flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl bg-gradient-to-r from-xova-accent via-xova-primary to-xova-secondary bg-clip-text text-transparent">
              Custom Smoothie Builder
            </span>
          </div>
          <Button variant="outline" onClick={() => onNavigate('dashboard')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Ingredient Selection */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h3 className="text-lg mb-4 flex items-center gap-2">
                <Apple className="w-5 h-5 text-xova-accent" />
                Select Ingredients
              </h3>

              {/* Category Filter */}
              <div className="flex gap-2 mb-4 flex-wrap">
                {CATEGORIES.map(cat => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>

              {/* Ingredient Grid */}
              <ScrollArea className="h-[300px]">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pr-4">
                  {filteredIngredients.map((ing, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      onClick={() => addIngredient(ing.name, ing.defaultQty)}
                      className="justify-start h-auto py-2"
                      disabled={ingredients.some(i => i.name === ing.name)}
                    >
                      <div className="text-left">
                        <div className="text-sm">{ing.name}</div>
                        <div className="text-xs text-muted-foreground">{ing.defaultQty}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </ScrollArea>

              <Separator className="my-4" />

              {/* Custom Ingredient */}
              <div>
                <Label className="mb-2 block">Add Custom Ingredient</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ingredient name"
                    value={customIngredientName}
                    onChange={(e) => setCustomIngredientName(e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    placeholder="Quantity"
                    value={customIngredientQty}
                    onChange={(e) => setCustomIngredientQty(e.target.value)}
                    className="w-32"
                  />
                  <Button onClick={addCustomIngredient} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Saved Smoothies */}
            {savedSmoothies.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-xova-primary" />
                  Your Creations ({savedSmoothies.length})
                </h3>
                <ScrollArea className="h-[200px]">
                  <div className="space-y-3 pr-4">
                    {savedSmoothies.map((smoothie) => (
                      <Card key={smoothie.id} className="p-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{smoothie.name}</h4>
                            <p className="text-xs text-muted-foreground mb-2">{smoothie.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {smoothie.ingredients.slice(0, 3).map((ing, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {ing.name}
                                </Badge>
                              ))}
                              {smoothie.ingredients.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{smoothie.ingredients.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => loadSmoothie(smoothie)}
                            >
                              Load
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteSmoothie(smoothie.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </Card>
            )}
          </div>

          {/* Right Column: Recipe Builder */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg mb-4 flex items-center gap-2">
                <Beaker className="w-5 h-5 text-xova-secondary" />
                Your Recipe
              </h3>

              <div className="space-y-4">
                <div>
                  <Label>Smoothie Name *</Label>
                  <Input
                    placeholder="e.g., Morning Energy Blast"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Description</Label>
                  <Input
                    placeholder="Brief description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <Separator />

                <div>
                  <Label className="mb-2 block">Ingredients ({ingredients.length})</Label>
                  {ingredients.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4 bg-muted/30 rounded">
                      No ingredients added yet
                    </p>
                  ) : (
                    <ScrollArea className="h-[200px]">
                      <div className="space-y-2 pr-4">
                        {ingredients.map((ing, idx) => (
                          <div key={idx} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                            <div className="flex-1">
                              <div className="text-sm font-medium">{ing.name}</div>
                              <Input
                                value={ing.quantity}
                                onChange={(e) => updateIngredientQuantity(idx, e.target.value)}
                                className="h-7 text-xs mt-1"
                              />
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeIngredient(idx)}
                              className="text-destructive"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </div>

                {ingredients.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <Label className="mb-2 block">Estimated Nutrition</Label>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 bg-xova-primary/5 rounded text-center">
                          <div className="font-medium">{estimatedMacros.calories}</div>
                          <div className="text-muted-foreground">kcal</div>
                        </div>
                        <div className="p-2 bg-xova-secondary/5 rounded text-center">
                          <div className="font-medium">{estimatedMacros.protein}g</div>
                          <div className="text-muted-foreground">protein</div>
                        </div>
                        <div className="p-2 bg-xova-accent/5 rounded text-center">
                          <div className="font-medium">{estimatedMacros.carbs}g</div>
                          <div className="text-muted-foreground">carbs</div>
                        </div>
                        <div className="p-2 bg-xova-warning/5 rounded text-center">
                          <div className="font-medium">{estimatedMacros.fiber}g</div>
                          <div className="text-muted-foreground">fiber</div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 text-center">
                        Estimated values - actual may vary
                      </p>
                    </div>
                  </>
                )}

                <Separator />

                <div>
                  <Label>Notes (optional)</Label>
                  <Textarea
                    placeholder="Any special notes or instructions..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-1 h-20"
                  />
                </div>

                <Button
                  onClick={saveSmoothie}
                  className="w-full bg-xova-accent hover:bg-xova-accent/90"
                  disabled={!name || ingredients.length === 0}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save to My Creations
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
