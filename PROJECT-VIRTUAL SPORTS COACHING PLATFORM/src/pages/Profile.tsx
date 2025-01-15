import React from 'react';
import { User, Edit2, Save } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Profile() {
  const [profile, setProfile] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [editing, setEditing] = React.useState(false);
  const [formData, setFormData] = React.useState({
    full_name: '',
    fitness_level: '',
    goals: [],
    preferred_sports: []
  });

  React.useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('users_profile')
          .select('*')
          .eq('id', user.id)
          .single();

        if (!error && data) {
          setProfile(data);
          setFormData(data);
        }
      }
      setLoading(false);
    }

    fetchProfile();
  }, []);

  const handleSave = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase
        .from('users_profile')
        .upsert({
          id: user.id,
          ...formData
        });

      if (!error) {
        setProfile(formData);
        setEditing(false);
      }
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading profile...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <User className="w-6 h-6" />
            Profile
          </h1>
          <button
            onClick={() => editing ? handleSave() : setEditing(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {editing ? (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            ) : (
              <>
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </>
            )}
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            {editing ? (
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-900">{profile?.full_name || 'Not set'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fitness Level
            </label>
            {editing ? (
              <select
                value={formData.fitness_level}
                onChange={(e) => setFormData({ ...formData, fitness_level: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            ) : (
              <p className="text-gray-900 capitalize">{profile?.fitness_level || 'Not set'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Goals
            </label>
            {editing ? (
              <input
                type="text"
                value={formData.goals?.join(', ')}
                onChange={(e) => setFormData({ ...formData, goals: e.target.value.split(',').map(g => g.trim()) })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter goals separated by commas"
              />
            ) : (
              <p className="text-gray-900">{profile?.goals?.join(', ') || 'No goals set'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Sports
            </label>
            {editing ? (
              <input
                type="text"
                value={formData.preferred_sports?.join(', ')}
                onChange={(e) => setFormData({ ...formData, preferred_sports: e.target.value.split(',').map(s => s.trim()) })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter sports separated by commas"
              />
            ) : (
              <p className="text-gray-900">{profile?.preferred_sports?.join(', ') || 'No sports selected'}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}