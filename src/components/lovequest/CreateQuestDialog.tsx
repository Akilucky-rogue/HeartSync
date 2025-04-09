
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import HeartButton from '@/components/ui/HeartButton';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface CreateQuestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateQuest: (quest: any) => void;
}

const difficultyOptions = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

const CreateQuestDialog = ({ isOpen, onClose, onCreateQuest }: CreateQuestDialogProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reward, setReward] = useState('');
  const [dueDate, setDueDate] = useState<Date>();
  const [difficulty, setDifficulty] = useState('easy');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !reward || !dueDate) {
      // In a real app, you'd want to show validation errors
      return;
    }
    
    onCreateQuest({
      title,
      description,
      reward,
      dueDate: dueDate.toISOString().split('T')[0],
      difficulty,
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setReward('');
    setDueDate(undefined);
    setDifficulty('easy');
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a Love Quest</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Quest Title</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="A catchy title for your quest" 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="What does this quest involve? Be specific about what your partner needs to do." 
              required 
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reward">Reward</Label>
            <Input 
              id="reward" 
              value={reward} 
              onChange={(e) => setReward(e.target.value)} 
              placeholder="What's the reward for completing this quest?" 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label>Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : <span>Select a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label>Difficulty</Label>
            <div className="flex gap-2">
              {difficultyOptions.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant={difficulty === option.value ? "default" : "outline"}
                  onClick={() => setDifficulty(option.value)}
                  className={cn(
                    "flex-1",
                    difficulty === option.value && 
                    (option.value === "easy" 
                      ? "bg-green-600 hover:bg-green-700" 
                      : option.value === "medium" 
                        ? "bg-amber-600 hover:bg-amber-700"
                        : "bg-red-600 hover:bg-red-700"
                    )
                  )}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
          
          <DialogFooter className="mt-6">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <HeartButton type="submit">
              Create Quest
            </HeartButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateQuestDialog;
