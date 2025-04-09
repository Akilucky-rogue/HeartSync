
import React, { useState } from 'react';
import { Gift, Award, Bookmark, Clock, Plus, Heart, CheckCircle } from 'lucide-react';
import HeartButton from '@/components/ui/HeartButton';
import { toast } from '@/hooks/use-toast';
import CreateQuestDialog from './CreateQuestDialog';

// Define Quest interface for better type safety
interface Quest {
  id: number;
  title: string;
  description: string;
  reward: string;
  status: "active" | "completed";
  difficulty: "easy" | "medium" | "hard";
  dueDate?: string;
  completedDate?: string;
}

// Mock data - in a real app this would come from a database
const questsData: Quest[] = [
  {
    id: 1,
    title: "Surprise Date Night",
    description: "Plan a surprise date for your partner without them knowing any details. The element of surprise is key!",
    reward: "A romantic movie night of your partner's choice",
    status: "active",
    dueDate: "2024-04-15",
    difficulty: "medium",
  },
  {
    id: 2,
    title: "Memory Lane",
    description: "Visit a place that holds a special memory for both of you and recreate a photo from that time.",
    reward: "Special homemade dessert",
    status: "completed",
    completedDate: "2024-03-20",
    difficulty: "easy",
  },
  {
    id: 3,
    title: "Love Letter Challenge",
    description: "Write a heartfelt love letter to your partner expressing your feelings and what you appreciate about them.",
    reward: "Massage session",
    status: "active",
    dueDate: "2024-04-20",
    difficulty: "easy",
  }
];

const LoveQuest = () => {
  const [quests, setQuests] = useState<Quest[]>(questsData);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  const activeQuests = quests.filter(quest => quest.status === "active");
  const completedQuests = quests.filter(quest => quest.status === "completed");
  
  const handleCompleteQuest = (questId: number) => {
    setQuests(prev => 
      prev.map(quest => 
        quest.id === questId 
          ? { 
              ...quest, 
              status: "completed" as const, 
              completedDate: new Date().toISOString().split('T')[0] 
            } 
          : quest
      )
    );
    toast({
      title: "Quest completed!",
      description: "Congratulations on completing your love quest!",
    });
  };

  const handleCreateQuest = (newQuest: Omit<Quest, 'id' | 'status' | 'completedDate'>) => {
    const questWithId: Quest = {
      ...newQuest,
      id: quests.length + 1,
      status: "active",
    };
    
    setQuests(prev => [...prev, questWithId]);
    setIsCreateDialogOpen(false);
    
    toast({
      title: "New quest created!",
      description: "Your love quest has been added successfully.",
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-serif mb-4">Love Quests</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Embark on romantic challenges to strengthen your bond. Complete quests to earn rewards and create memorable experiences together.
          </p>
        </div>

        <div className="flex justify-end mb-8">
          <HeartButton onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create New Quest
          </HeartButton>
        </div>
        
        {/* Active Quests */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif mb-6 flex items-center">
            <Clock className="mr-2 text-heart w-5 h-5" />
            Active Quests
          </h2>
          
          {activeQuests.length === 0 ? (
            <div className="text-center p-8 border border-dashed border-border rounded-lg">
              <p className="text-muted-foreground">No active quests. Create one to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeQuests.map(quest => (
                <div key={quest.id} className="romance-card p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-medium">{quest.title}</h3>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      quest.difficulty === "easy" 
                        ? "bg-green-100 text-green-700" 
                        : quest.difficulty === "medium"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                    }`}>
                      {quest.difficulty}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{quest.description}</p>
                  
                  {quest.dueDate && (
                    <div className="flex items-center text-muted-foreground mb-4">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">Due: {new Date(quest.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center mb-6">
                    <Gift className="w-4 h-4 mr-2 text-heart" />
                    <span className="text-sm font-medium">Reward: {quest.reward}</span>
                  </div>
                  
                  <HeartButton onClick={() => handleCompleteQuest(quest.id)}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Completed
                  </HeartButton>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Completed Quests */}
        {completedQuests.length > 0 && (
          <div>
            <h2 className="text-2xl font-serif mb-6 flex items-center">
              <Award className="mr-2 text-heart w-5 h-5" />
              Completed Quests
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {completedQuests.map(quest => (
                <div key={quest.id} className="romance-card p-6 bg-muted/20">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-medium flex items-center">
                      {quest.title}
                      <CheckCircle className="w-4 h-4 ml-2 text-green-600" />
                    </h3>
                    <div className={`px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground`}>
                      {quest.difficulty}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{quest.description}</p>
                  
                  {quest.completedDate && (
                    <div className="flex items-center text-muted-foreground mb-4">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                      <span className="text-sm">
                        Completed: {new Date(quest.completedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <Gift className="w-4 h-4 mr-2 text-heart" />
                    <span className="text-sm font-medium">Reward: {quest.reward}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <CreateQuestDialog 
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onCreateQuest={handleCreateQuest}
      />
    </div>
  );
};

export default LoveQuest;
