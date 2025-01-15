import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Activity, TrendingUp, Play } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const [upcomingSessions, setUpcomingSessions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchSessions() {
      const { data: sessions, error } = await supabase
        .from('sessions')
        .select('*')
        .eq('status', 'scheduled')
        .order('session_date', { ascending: true })
        .limit(3);

      if (!error) {
        setUpcomingSessions(sessions);
      }
      setLoading(false);
    }

    fetchSessions();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <Link
          to="/session/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <Play className="w-4 h-4" />
          New Session
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Next Session</h3>
              <p className="text-gray-600">Today, 2:00 PM</p>
            </div>
          </div>
          <Link
            to="/session/upcoming"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View Schedule →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Recent Activity</h3>
              <p className="text-gray-600">3 sessions this week</p>
            </div>
          </div>
          <Link
            to="/progress"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View Progress →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Performance</h3>
              <p className="text-gray-600">15% improvement</p>
            </div>
          </div>
          <Link
            to="/stats"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View Statistics →
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Sessions</h2>
        {loading ? (
          <p className="text-gray-600">Loading sessions...</p>
        ) : upcomingSessions.length > 0 ? (
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-semibold">{session.sport_type}</h3>
                  <p className="text-gray-600">
                    {new Date(session.session_date).toLocaleString()}
                  </p>
                </div>
                <Link
                  to={`/session/${session.id}`}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Join Session →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No upcoming sessions scheduled</p>
        )}
      </div>
    </div>
  );
}