
'use client';
import { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import html2canvas from 'html2canvas';
import ProfileCard from './ProfileCard';
import SearchAndLeaderboard from './SearchAndLeaderboard';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Javi A. Torres",
    title: "Software Engineer",
    handle: "javicodes",
    status: "Online",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
  });
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleProfileSelect = (profile: any) => {
    setProfileData({
      name: profile.name,
      title: profile.title,
      handle: profile.handle,
      status: profile.status || "Online",
      avatarUrl: profile.avatarUrl
    });
  };

  const handleProfileUpdate = (data: any) => {
    setProfileData(prev => ({
      ...prev,
      ...data
    }));
  };

  const handleExportCard = async (format: 'png' | 'jpeg') => {
    const cardElement = document.querySelector('.pc-card-wrapper') as HTMLElement;
    if (!cardElement) return;

    try {
      const canvas = await html2canvas(cardElement, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: cardElement.offsetWidth,
        height: cardElement.offsetHeight
      });

      const link = document.createElement('a');
      link.download = `monad-profile-card-${profileData.handle}.${format}`;
      link.href = canvas.toDataURL(`image/${format === 'jpeg' ? 'jpeg' : 'png'}`);
      link.click();
    } catch (error) {
      console.error('Error exporting card:', error);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px',
      position: 'relative'
    }}>
      {/* Wallet Connect Button */}
      {mounted && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1001
        }}>
          <ConnectButton 
            showBalance={false}
            accountStatus="address"
            chainStatus="icon"
          />
        </div>
      )}

      {/* Search and Leaderboard - moved to left */}
      <div style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: 1000
      }}>
        <SearchAndLeaderboard onProfileSelect={handleProfileSelect} />
      </div>

      

      {/* Floating Monad Logo */}
      <div style={{
        position: 'relative',
        marginBottom: '20px'
      }}>
        <img 
          src="/monad_logo.ico" 
          alt="Monad Logo" 
          style={{
            width: '60px',
            height: '60px',
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
            animation: 'float 3s ease-in-out infinite'
          }}
        />
      </div>

      {/* Heading */}
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: '700',
        color: 'white',
        marginBottom: '40px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #fff, #c137ff, #07c6ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        letterSpacing: '2px'
      }}>
        MONAD PROFILE CARD
      </h1>

      {/* Profile Card */}
      <ProfileCard
        name={profileData.name}
        title={profileData.title}
        handle={profileData.handle}
        status={profileData.status}
        contactText=''
        avatarUrl={profileData.avatarUrl}
        showUserInfo={true}
        enableTilt={true}
        onContactClick={() => window.open(`https://x.com/${profileData.handle}`, '_blank')}
        onProfileUpdate={handleProfileUpdate}
        onExportCard={handleExportCard}
        showSettings={showSettings}
        onToggleSettings={() => setShowSettings(!showSettings)}
      />

      {/* Floating animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}
