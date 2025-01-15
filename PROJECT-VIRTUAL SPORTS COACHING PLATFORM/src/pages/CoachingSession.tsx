import React from 'react';
import { useParams } from 'react-router-dom';
import { Camera, Mic, MessageSquare, Activity } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function CoachingSession() {
  const { id } = useParams();
  const [session, setSession] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchSession() {
      const { data, error } = await supabase
        .from('sessions')
        .select('*, performance_metrics(*)')
        .eq('id', id)
        .single();

      if (!error) {
        setSession(data);
      }
      setLoading(false);
    }

    fetchSession();
  }, [id]);

  if (loading) {
    return <div className="text-center p-8">Loading session...</div>;
  }

  if (!session) {
    return <div className="text-center p-8">Session not found</div>;
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex-1 grid grid-cols-4 gap-4">
        <div className="col-span-3 bg-black rounded-xl relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80"
              alt="Training Session"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Camera
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
              <Mic className="w-4 h-4" />
              Microphone
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Chat
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 flex flex-col">
          <h2 className="text-xl font-semibold mb-4">AI Analysis</h2>
          <div className="flex-1 space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-blue-600" />
                <h3 className="font-semibold">Form Analysis</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Your form is looking good. Keep your core engaged and maintain the rhythm.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-green-600" />
                <h3 className="font-semibold">Performance Metrics</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Speed</span>
                  <span className="font-medium">8.5 mph</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Heart Rate</span>
                  <span className="font-medium">145 bpm</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Calories</span>
                  <span className="font-medium">256 kcal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}