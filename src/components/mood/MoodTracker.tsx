
import React, { useState } from 'react';
import { Calendar, Heart, MoreHorizontal, Smile, Frown, Meh, Send } from 'lucide-react';

// Mock mood data - in a real app this would come from a database
const moodHistory = [
  { date: '2024-04-01', mood: 'happy', note: 'Had a wonderful dinner date!' },
  { date: '2024-04-02', mood: 'neutral', note: 'Normal day, nothing special.' },
  { date: '2024-03-31', mood: 'sad', note: 'Argument about plans for the weekend.' },
  { date: '2024-03-30', mood: 'happy', note: 'Surprised me with flowers!' },
  { date: '2024-03-29', mood: 'happy', note: 'Movie night at home.' },
];

const moods = [
  { value: 'happy', icon: <Smile className="w-6 h-6" />, label: 'Happy', color: 'bg-green-100 text-green-600 border-green-200' },
  { value: 'neutral', icon: <Meh className="w-6 h-6" />, label: 'Neutral', color: 'bg-blue-100 text-blue-600 border-blue-200' },
  { value: 'sad', icon: <Frown className="w-6 h-6" />, label: 'Sad', color: 'bg-red-100 text-red-600 border-red-200' },
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [moodNote, setMoodNote] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to a database
    console.log('Mood submitted:', { mood: selectedMood, note: moodNote });
    // Reset form
    setSelectedMood('');
    setMoodNote('');
  };
  
  const getMoodIcon = (moodValue: string) => {
    const mood = moods.find(m => m.value === moodValue);
    return mood ? mood.icon : <Meh />;
  };
  
  const getMoodColor = (moodValue: string) => {
    const mood = moods.find(m => m.value === moodValue);
    return mood ? mood.color : 'bg-gray-100 text-gray-600 border-gray-200';
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-serif mb-4">Mood Tracker</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track your emotional journey together. Share how you're feeling and reflect on your emotional patterns.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mood Entry Form */}
          <div className="romance-card p-6">
            <h3 className="text-xl font-medium mb-6 flex items-center gap-2">
              <Heart className="w-5 h-5 text-heart" />
              How are you feeling today?
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between mb-6">
                {moods.map(mood => (
                  <button
                    key={mood.value}
                    type="button"
                    onClick={() => setSelectedMood(mood.value)}
                    className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                      selectedMood === mood.value 
                        ? `${mood.color} border-2` 
                        : 'border-transparent hover:bg-muted/20'
                    }`}
                  >
                    {mood.icon}
                    <span className="mt-2 text-sm">{mood.label}</span>
                  </button>
                ))}
              </div>
              
              <div className="mb-4">
                <label htmlFor="note" className="block text-sm font-medium mb-2">
                  Add a note (optional)
                </label>
                <textarea
                  id="note"
                  value={moodNote}
                  onChange={(e) => setMoodNote(e.target.value)}
                  className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-heart/20 focus:border-heart outline-none transition-all resize-none"
                  placeholder="How are you feeling today?"
                  rows={3}
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={!selectedMood}
                className="w-full py-2 px-4 bg-heart text-white rounded-lg flex items-center justify-center gap-2 hover:bg-heart-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                Share Mood
              </button>
            </form>
          </div>
          
          {/* Mood History */}
          <div className="lg:col-span-2">
            <div className="romance-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-medium flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-heart" />
                  Recent Mood History
                </h3>
                <button className="text-muted-foreground hover:text-foreground">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                {moodHistory.map((entry, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border-b border-border last:border-0">
                    <div className={`p-2 rounded-full ${getMoodColor(entry.mood)}`}>
                      {getMoodIcon(entry.mood)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-medium capitalize">{entry.mood}</h4>
                        <span className="text-sm text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{entry.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
