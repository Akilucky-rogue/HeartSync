
import React from 'react';
import { Calendar, Clock, Heart, MessageCircle, Smile, Book } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import QuoteDisplay from '@/components/common/Quote';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  
  // This would come from a real database in a real app
  const relationshipStats = {
    daysCount: 365,
    messageCount: 1245,
    moodAverage: 'Happy',
    upcomingEvent: 'Movie Night',
    upcomingDate: 'April 5, 2024',
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-serif mb-4">
            Welcome Back, {user?.name}
          </h1>
          <QuoteDisplay autoChange interval={15000} className="max-w-2xl mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Daily Mood Card */}
          <div className="romance-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-heart/10 flex items-center justify-center">
                <Smile className="w-6 h-6 text-heart" />
              </div>
              <h3 className="text-xl font-medium">Today's Mood</h3>
            </div>
            <div className="text-center py-6">
              <div className="inline-block bg-heart/10 rounded-full p-4 mb-4">
                <Smile className="w-12 h-12 text-heart" />
              </div>
              <p className="text-lg font-medium">{relationshipStats.moodAverage}</p>
              <p className="text-sm text-muted-foreground mt-1">Track your daily emotions</p>
            </div>
            <Link to="/mood" className="block w-full mt-2 py-2 px-4 text-center border border-heart text-heart rounded-lg hover:bg-heart/5 transition-colors">
              Update Mood
            </Link>
          </div>
          
          {/* Relationship Stats Card */}
          <div className="romance-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-heart/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-heart" />
              </div>
              <h3 className="text-xl font-medium">Your Relationship</h3>
            </div>
            <div className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-heart" />
                  <span className="text-muted-foreground">Days Together</span>
                </div>
                <span className="font-medium">{relationshipStats.daysCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-heart" />
                  <span className="text-muted-foreground">Messages</span>
                </div>
                <span className="font-medium">{relationshipStats.messageCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Smile className="w-5 h-5 text-heart" />
                  <span className="text-muted-foreground">Mood Average</span>
                </div>
                <span className="font-medium">{relationshipStats.moodAverage}</span>
              </div>
            </div>
          </div>
          
          {/* Upcoming Events Card */}
          <div className="romance-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-heart/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-heart" />
              </div>
              <h3 className="text-xl font-medium">Upcoming</h3>
            </div>
            <div className="text-center py-6">
              <div className="inline-block bg-heart/10 rounded-full p-4 mb-4">
                <Calendar className="w-12 h-12 text-heart" />
              </div>
              <p className="text-lg font-medium">{relationshipStats.upcomingEvent}</p>
              <p className="text-sm text-muted-foreground mt-1">{relationshipStats.upcomingDate}</p>
            </div>
            <button className="w-full mt-2 py-2 px-4 border border-heart text-heart rounded-lg hover:bg-heart/5 transition-colors">
              View Calendar
            </button>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/messages" className="romance-card p-4 flex flex-col items-center text-center hover:bg-muted/20 transition-colors">
            <MessageCircle className="w-8 h-8 text-heart mb-2" />
            <span>Message Partner</span>
          </Link>
          <Link to="/quests" className="romance-card p-4 flex flex-col items-center text-center hover:bg-muted/20 transition-colors">
            <Heart className="w-8 h-8 text-heart mb-2" />
            <span>Love Quests</span>
          </Link>
          <Link to="/timeline" className="romance-card p-4 flex flex-col items-center text-center hover:bg-muted/20 transition-colors">
            <Calendar className="w-8 h-8 text-heart mb-2" />
            <span>Our Timeline</span>
          </Link>
          <Link to="/love-language" className="romance-card p-4 flex flex-col items-center text-center hover:bg-muted/20 transition-colors">
            <Book className="w-8 h-8 text-heart mb-2" />
            <span>Love Languages</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
