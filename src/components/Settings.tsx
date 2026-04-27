import React, { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Save, Users, Building, Image as ImageIcon, Loader2 } from 'lucide-react';

export function Settings() {
  const [profile, setProfile] = useState({ name: '', company: '' });
  const [logo, setLogo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!auth.currentUser) return;
      setLoading(true);
      try {
        const docRef = doc(db, 'user_settings', auth.currentUser.uid);
        const snap = await getDoc(docRef);
        if (snap.exists() && snap.data()) {
          const data = snap.data();
          if (data.profile) setProfile(data.profile);
          if (data.logo) setLogo(data.logo);
        } else {
           // Default if user logged in via google
           setProfile({ 
             name: auth.currentUser.displayName || '', 
             company: 'Mari Beach Club' 
           });
        }
      } catch (err) {
        console.error("Error fetching settings:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB limit for base64
        alert('Image must be less than 1MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!auth.currentUser) return;
    setSaving(true);
    try {
      const docRef = doc(db, 'user_settings', auth.currentUser.uid);
      await setDoc(docRef, { profile, logo }, { merge: true });
      alert('Settings saved successfully!');
      // Force reload to apply logo globally
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-[#7A2B20]" /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 pt-6">
      <div>
        <h2 className="text-3xl font-serif font-bold text-[#3E1510]">Settings</h2>
        <p className="text-[#A88C87] mt-2 font-medium">Manage your profile, team access, and whitelabeling.</p>
      </div>

      <div className="bg-white border border-[#EAE3D9] rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#EAE3D9]">
          <h3 className="text-lg font-bold text-[#3E1510] flex items-center"><Building className="w-5 h-5 mr-2 text-[#7A2B20]" /> Whitelabeling & Brand</h3>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-bold text-[#5C4541] mb-2">Company Name</label>
            <input 
              type="text" 
              value={profile.company}
              onChange={e => setProfile({...profile, company: e.target.value})}
              className="w-full bg-[#FDF8F3] border border-[#EAE3D9] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#DDA77B]" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#5C4541] mb-2">Company Logo</label>
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-[#F9F7F4] border-2 border-dashed border-[#DDA77B] rounded-xl flex items-center justify-center overflow-hidden">
                {logo ? (
                  <img src={logo} alt="Company Logo" className="w-full h-full object-contain" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-[#A88C87]" />
                )}
              </div>
              <div>
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" id="logo-upload" />
                <label htmlFor="logo-upload" className="cursor-pointer px-4 py-2 bg-white border border-[#EAE3D9] text-[#3E1510] font-bold rounded-lg shadow-sm hover:bg-[#F9F7F4] transition-colors inline-block">
                  Upload Logo
                </label>
                <p className="text-xs text-[#A88C87] mt-2">Max 1MB, recommend square ratio.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#EAE3D9] rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#EAE3D9]">
          <h3 className="text-lg font-bold text-[#3E1510] flex items-center"><Users className="w-5 h-5 mr-2 text-[#7A2B20]" /> Personal Profile</h3>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-bold text-[#5C4541] mb-2">Your Name</label>
            <input 
              type="text" 
              value={profile.name}
              onChange={e => setProfile({...profile, name: e.target.value})}
              className="w-full bg-[#FDF8F3] border border-[#EAE3D9] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#DDA77B]" 
            />
          </div>
          <div>
             <label className="block text-sm font-bold text-[#5C4541] mb-2">Email Address</label>
             <input type="text" value={auth.currentUser?.email || ''} disabled className="w-full bg-slate-100 border border-slate-200 text-slate-500 rounded-lg px-4 py-3 cursor-not-allowed" />
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#EAE3D9] rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#EAE3D9]">
          <h3 className="text-lg font-bold text-[#3E1510] flex items-center"><Users className="w-5 h-5 mr-2 text-[#7A2B20]" /> Team Management</h3>
        </div>
        <div className="p-6">
           <p className="text-[#A88C87] text-sm mb-4">Manage who has access to your intelligence dashboards.</p>
           <div className="bg-[#F9F7F4] p-4 rounded-xl border border-[#EAE3D9] flex justify-between items-center">
              <div>
                 <p className="font-bold text-[#3E1510]">{auth.currentUser?.email}</p>
                 <p className="text-xs text-[#7A2B20] font-semibold mt-0.5">Owner</p>
              </div>
              <span className="px-3 py-1 bg-[#EBF4ED] text-[#2E6B3B] text-xs font-bold rounded-full">Active</span>
           </div>
           
           <button disabled className="mt-4 px-4 py-2 bg-white text-[#A88C87] border border-[#EAE3D9] rounded-lg text-sm font-bold cursor-not-allowed">
              + Invite Team Member (Pro Plan)
           </button>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center px-6 py-3 bg-[#3E1510] hover:bg-[#522019] text-white rounded-lg font-bold transition-colors disabled:opacity-50 shadow"
        >
          {saving ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

    </div>
  );
}
