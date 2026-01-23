'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

interface UserProfileDashboardProps {
  className?: string
}

export default function UserProfileDashboard({ className = '' }: UserProfileDashboardProps) {
  const { user, updateProfile, logout } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPasswordChange, setShowPasswordChange] = useState(false)

  const [profileData, setProfileData] = useState({
    name: '',
    phone: '',
    profile: {
      grade: '',
      curriculum: '',
      school: '',
      city: '',
      bio: '',
      goals: [],
      preferences: {
        notifications: {
          email: true,
          sms: false,
          push: false,
        },
        privacy: {
          profileVisible: false,
          progressVisible: true,
          allowContactFromTeachers: true,
        },
        study: {
          preferredStudyTime: 'EVENING',
          dailyStudyGoal: 120,
          reminderFrequency: 'DAILY',
        },
      },
    },
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    logoutOtherDevices: false,
  })

  // Initialize profile data when user loads
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        phone: (user as any).phone || '',
        profile: {
          grade: user.profile?.grade || '',
          curriculum: user.profile?.curriculum || '',
          school: user.profile?.school || '',
          city: user.profile?.city || '',
          bio: user.profile?.bio || '',
          goals: user.profile?.goals || [],
          preferences: {
            notifications: {
              email: user.profile?.preferences?.notifications?.email ?? true,
              sms: user.profile?.preferences?.notifications?.sms ?? false,
              push: user.profile?.preferences?.notifications?.push ?? false,
            },
            privacy: {
              profileVisible: user.profile?.preferences?.privacy?.profileVisible ?? false,
              progressVisible: user.profile?.preferences?.privacy?.progressVisible ?? true,
              allowContactFromTeachers:
                user.profile?.preferences?.privacy?.allowContactFromTeachers ?? true,
            },
            study: {
              preferredStudyTime: user.profile?.preferences?.study?.preferredStudyTime || 'EVENING',
              dailyStudyGoal: user.profile?.preferences?.study?.dailyStudyGoal || 120,
              reminderFrequency: user.profile?.preferences?.study?.reminderFrequency || 'DAILY',
            },
          },
        },
      })
    }
  }, [user])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    if (name.includes('.')) {
      const keys = name.split('.')
      setProfileData((prev) => {
        const updated = { ...prev }
        let current: any = updated
        for (let i = 0; i < keys.length - 1; i++) {
          current = current[keys[i]]
        }
        current[keys[keys.length - 1]] = type === 'checkbox' ? checked : value
        return updated
      })
    } else {
      setProfileData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }))
    }

    if (error) setError('')
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setPasswordData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSaveProfile = async () => {
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const result = await updateProfile(profileData)
      if (result.success) {
        setSuccess('Profile updated successfully!')
        setIsEditing(false)
      } else {
        setError(result.error || 'Failed to update profile')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(passwordData),
        credentials: 'include',
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSuccess('Password changed successfully!')
        setShowPasswordChange(false)
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
          logoutOtherDevices: false,
        })
      } else {
        setError(data.message || 'Failed to change password')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const getProfileCompletionPercentage = () => {
    if (!user) return 0
    return user.profileCompletion || 0
  }

  if (!user) {
    return <LoadingSpinner text="Loading profile..." />
  }

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-500 px-6 py-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
              <p className="text-blue-100 mt-1">
                {user.role === 'STUDENT'
                  ? 'Student'
                  : user.role === 'PARENT'
                    ? 'Parent'
                    : user.role}{' '}
                • {user.email}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-100">Profile Completion</div>
              <div className="text-2xl font-bold">{getProfileCompletionPercentage()}%</div>
            </div>
          </div>

          {/* Profile completion bar */}
          <div className="mt-4">
            <div className="w-full bg-blue-500 bg-opacity-30 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProfileCompletionPercentage()}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm">{success}</p>
            </div>
          )}

          <div className="space-y-8">
            {/* Basic Information */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Basic Information</h2>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} variant="outline">
                    Edit Profile
                  </Button>
                ) : (
                  <div className="space-x-2">
                    <Button onClick={handleSaveProfile} disabled={isLoading}>
                      {isLoading ? <LoadingSpinner size="sm" color="white" /> : 'Save Changes'}
                    </Button>
                    <Button onClick={() => setIsEditing(false)} variant="outline">
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{profileData.name || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{profileData.phone || 'Not provided'}</p>
                  )}
                </div>

                {user.role === 'STUDENT' && (
                  <>
                    <div>
                      <Label htmlFor="profile.grade">Grade/Class</Label>
                      {isEditing ? (
                        <select
                          id="profile.grade"
                          name="profile.grade"
                          value={profileData.profile.grade}
                          onChange={handleInputChange}
                          className="flex h-12 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                        >
                          <option value="">Select Grade</option>
                          <option value="CLASS_9">Class 9</option>
                          <option value="CLASS_10">Class 10</option>
                          <option value="CLASS_11">Class 11</option>
                          <option value="CLASS_12">Class 12</option>
                          <option value="DROPPER">Dropper/Repeater</option>
                        </select>
                      ) : (
                        <p className="mt-1 text-gray-900">
                          {profileData.profile.grade || 'Not provided'}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="profile.curriculum">Curriculum</Label>
                      {isEditing ? (
                        <select
                          id="profile.curriculum"
                          name="profile.curriculum"
                          value={profileData.profile.curriculum}
                          onChange={handleInputChange}
                          className="flex h-12 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                        >
                          <option value="">Select Curriculum</option>
                          <option value="NEET">NEET</option>
                          <option value="CBSE">CBSE</option>
                          <option value="ICSE">ICSE</option>
                          <option value="IB">IB</option>
                          <option value="IGCSE">IGCSE</option>
                          <option value="STATE_BOARD">State Board</option>
                        </select>
                      ) : (
                        <p className="mt-1 text-gray-900">
                          {profileData.profile.curriculum || 'Not provided'}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="profile.school">School/Institution</Label>
                      {isEditing ? (
                        <Input
                          id="profile.school"
                          name="profile.school"
                          value={profileData.profile.school}
                          onChange={handleInputChange}
                          placeholder="Enter your school name"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">
                          {profileData.profile.school || 'Not provided'}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="profile.city">City</Label>
                      {isEditing ? (
                        <Input
                          id="profile.city"
                          name="profile.city"
                          value={profileData.profile.city}
                          onChange={handleInputChange}
                          placeholder="Enter your city"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">
                          {profileData.profile.city || 'Not provided'}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>

              {isEditing && (
                <div className="mt-4">
                  <Label htmlFor="profile.bio">Bio</Label>
                  <textarea
                    id="profile.bio"
                    name="profile.bio"
                    value={profileData.profile.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself..."
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    maxLength={500}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {profileData.profile.bio.length}/500 characters
                  </p>
                </div>
              )}
            </div>

            {/* Study Preferences */}
            {user.role === 'STUDENT' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Study Preferences</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="profile.preferences.study.preferredStudyTime">
                      Preferred Study Time
                    </Label>
                    {isEditing ? (
                      <select
                        id="profile.preferences.study.preferredStudyTime"
                        name="profile.preferences.study.preferredStudyTime"
                        value={profileData.profile.preferences.study.preferredStudyTime}
                        onChange={handleInputChange}
                        className="flex h-12 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                      >
                        <option value="MORNING">Morning</option>
                        <option value="AFTERNOON">Afternoon</option>
                        <option value="EVENING">Evening</option>
                        <option value="NIGHT">Night</option>
                      </select>
                    ) : (
                      <p className="mt-1 text-gray-900">
                        {profileData.profile.preferences.study.preferredStudyTime}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="profile.preferences.study.dailyStudyGoal">
                      Daily Study Goal (minutes)
                    </Label>
                    {isEditing ? (
                      <Input
                        id="profile.preferences.study.dailyStudyGoal"
                        name="profile.preferences.study.dailyStudyGoal"
                        type="number"
                        min="30"
                        max="480"
                        value={profileData.profile.preferences.study.dailyStudyGoal}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">
                        {profileData.profile.preferences.study.dailyStudyGoal} minutes
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="profile.preferences.study.reminderFrequency">
                      Reminder Frequency
                    </Label>
                    {isEditing ? (
                      <select
                        id="profile.preferences.study.reminderFrequency"
                        name="profile.preferences.study.reminderFrequency"
                        value={profileData.profile.preferences.study.reminderFrequency}
                        onChange={handleInputChange}
                        className="flex h-12 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                      >
                        <option value="NEVER">Never</option>
                        <option value="DAILY">Daily</option>
                        <option value="WEEKLY">Weekly</option>
                      </select>
                    ) : (
                      <p className="mt-1 text-gray-900">
                        {profileData.profile.preferences.study.reminderFrequency}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="profile.preferences.privacy.profileVisible">
                    Make profile visible to other students
                  </Label>
                  <input
                    id="profile.preferences.privacy.profileVisible"
                    name="profile.preferences.privacy.profileVisible"
                    type="checkbox"
                    checked={profileData.profile.preferences.privacy.profileVisible}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="profile.preferences.privacy.progressVisible">
                    Show progress to parents/teachers
                  </Label>
                  <input
                    id="profile.preferences.privacy.progressVisible"
                    name="profile.preferences.privacy.progressVisible"
                    type="checkbox"
                    checked={profileData.profile.preferences.privacy.progressVisible}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="profile.preferences.privacy.allowContactFromTeachers">
                    Allow contact from teachers
                  </Label>
                  <input
                    id="profile.preferences.privacy.allowContactFromTeachers"
                    name="profile.preferences.privacy.allowContactFromTeachers"
                    type="checkbox"
                    checked={profileData.profile.preferences.privacy.allowContactFromTeachers}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Security */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Security</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">Password</h3>
                    <p className="text-sm text-gray-600">Last updated: Never</p>
                  </div>
                  <Button
                    onClick={() => setShowPasswordChange(!showPasswordChange)}
                    variant="outline"
                  >
                    Change Password
                  </Button>
                </div>

                {showPasswordChange && (
                  <div className="p-4 border border-gray-200 rounded-lg space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter current password"
                      />
                    </div>

                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter new password"
                      />
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        placeholder="Confirm new password"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        id="logoutOtherDevices"
                        name="logoutOtherDevices"
                        type="checkbox"
                        checked={passwordData.logoutOtherDevices}
                        onChange={handlePasswordChange}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="logoutOtherDevices" className="ml-2 text-sm text-gray-700">
                        Logout from all other devices
                      </label>
                    </div>

                    <div className="flex space-x-2">
                      <Button onClick={handleChangePassword} disabled={isLoading}>
                        {isLoading ? <LoadingSpinner size="sm" color="white" /> : 'Change Password'}
                      </Button>
                      <Button onClick={() => setShowPasswordChange(false)} variant="outline">
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">Account</h3>
                    <p className="text-sm text-gray-600">
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <Button
                    onClick={logout}
                    variant="outline"
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
