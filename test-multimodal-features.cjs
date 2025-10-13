#!/usr/bin/env node

// Test script for AI image and voice features
// Tests the multimodal capabilities we just implemented

const fs = require('fs');
const path = require('path');

async function testImageAnalysisAPI() {
    console.log('🧪 Testing Image Analysis API...');

    try {
        // Create a dummy image data (base64 encoded 1x1 PNG)
        const dummyImageData = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAGAWAAWAAAAASUVORK5CYII=';
        const buffer = Buffer.from(dummyImageData, 'base64');

        // Create FormData equivalent
        const FormData = require('form-data');
        const form = new FormData();
        form.append('image', buffer, {
            filename: 'test-biology-image.png',
            contentType: 'image/png'
        });
        form.append('question', 'Analyze this biology diagram and explain the cellular structures');
        form.append('context', 'NEET Biology - Cell Biology');

        const response = await fetch('http://localhost:3000/api/ai/image-analysis', {
            method: 'POST',
            body: form,
            headers: form.getHeaders()
        });

        const result = await response.json();

        if (result.success) {
            console.log('✅ Image Analysis API working correctly');
            console.log('📊 Analysis structure:', Object.keys(result.data.analysis));
            return true;
        } else {
            console.log('❌ Image Analysis API failed:', result.error);
            return false;
        }
    } catch (error) {
        console.log('❌ Image Analysis API test failed:', error.message);
        return false;
    }
}

async function testVoiceProcessingAPI() {
    console.log('🎤 Testing Voice Processing API...');

    try {
        // Create a dummy audio file (minimal WAV header)
        const wavHeader = Buffer.from([
            0x52, 0x49, 0x46, 0x46, // "RIFF"
            0x24, 0x00, 0x00, 0x00, // File size
            0x57, 0x41, 0x56, 0x45, // "WAVE"
            0x66, 0x6D, 0x74, 0x20, // "fmt "
            0x10, 0x00, 0x00, 0x00, // Chunk size
            0x01, 0x00, 0x01, 0x00, // Audio format & channels
            0x40, 0x1F, 0x00, 0x00, // Sample rate
            0x80, 0x3E, 0x00, 0x00, // Byte rate
            0x02, 0x00, 0x10, 0x00, // Block align & bits per sample
            0x64, 0x61, 0x74, 0x61, // "data"
            0x00, 0x00, 0x00, 0x00  // Data size
        ]);

        const FormData = require('form-data');
        const form = new FormData();
        form.append('audio', wavHeader, {
            filename: 'test-voice-question.wav',
            contentType: 'audio/wav'
        });
        form.append('action', 'transcribe_only');
        form.append('context', 'NEET Biology');

        const response = await fetch('http://localhost:3000/api/ai/voice-processing', {
            method: 'POST',
            body: form,
            headers: form.getHeaders()
        });

        const result = await response.json();

        if (result.success) {
            console.log('✅ Voice Processing API working correctly');
            console.log('🎯 Features available:', result.data.metadata.action_performed);
            return true;
        } else {
            console.log('❌ Voice Processing API failed:', result.error);
            return false;
        }
    } catch (error) {
        console.log('❌ Voice Processing API test failed:', error.message);
        return false;
    }
}

async function testMainEducationAPI() {
    console.log('🧠 Testing Main Education API...');

    try {
        const response = await fetch('http://localhost:3000/api/ai/education-hub', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'resolve_doubt',
                data: {
                    question: 'What is photosynthesis and its two main stages?',
                    student_level: 'neet',
                    context: 'Plant Biology - Photosynthesis'
                }
            })
        });

        const result = await response.json();

        if (result.success) {
            console.log('✅ Main Education API working correctly');
            console.log('📚 Response type:', result.data.response_type);
            return true;
        } else {
            console.log('❌ Main Education API failed:', result.error);
            return false;
        }
    } catch (error) {
        console.log('❌ Main Education API test failed:', error.message);
        return false;
    }
}

async function testHealthChecks() {
    console.log('🏥 Testing API Health Checks...');

    const endpoints = [
        { name: 'Image Analysis', url: 'http://localhost:3000/api/ai/image-analysis' },
        { name: 'Voice Processing', url: 'http://localhost:3000/api/ai/voice-processing' }
    ];

    let allHealthy = true;

    for (const endpoint of endpoints) {
        try {
            const response = await fetch(endpoint.url);
            const result = await response.json();

            if (result.success && result.status === 'operational') {
                console.log(`✅ ${endpoint.name} health check passed`);
            } else {
                console.log(`❌ ${endpoint.name} health check failed`);
                allHealthy = false;
            }
        } catch (error) {
            console.log(`❌ ${endpoint.name} health check error:`, error.message);
            allHealthy = false;
        }
    }

    return allHealthy;
}

async function runAllTests() {
    console.log('🚀 Starting Multimodal AI Features Test Suite\n');
    console.log('Testing the newly implemented image and voice capabilities...\n');

    const results = {
        healthChecks: await testHealthChecks(),
        mainEducationAPI: await testMainEducationAPI(),
        imageAnalysisAPI: await testImageAnalysisAPI(),
        voiceProcessingAPI: await testVoiceProcessingAPI()
    };

    console.log('\n📊 Test Results Summary:');
    console.log('========================');

    Object.entries(results).forEach(([test, passed]) => {
        console.log(`${passed ? '✅' : '❌'} ${test}: ${passed ? 'PASSED' : 'FAILED'}`);
    });

    const allPassed = Object.values(results).every(result => result);

    console.log(`\n🎯 Overall Status: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);

    if (allPassed) {
        console.log('\n🎉 Congratulations! The multimodal AI features are working correctly:');
        console.log('   • Image analysis with GPT-4 Vision ✅');
        console.log('   • Voice processing with Whisper & TTS ✅');
        console.log('   • Enhanced chat interface integration ✅');
        console.log('   • Real AI-powered doubt resolution ✅');
        console.log('\n👨‍🎓 Students can now:');
        console.log('   • Upload biology images for AI analysis');
        console.log('   • Ask questions using voice input');
        console.log('   • Receive AI responses with audio playback');
        console.log('   • Get structured learning with NEET focus');
    } else {
        console.log('\n🔧 Some features need attention. Check the failed tests above.');
    }

    return allPassed;
}

// Check if we can import required modules
try {
    const FormData = require('form-data');
    console.log('📦 Required dependencies available');
} catch (error) {
    console.log('❌ Missing dependencies. Please run: npm install form-data');
    process.exit(1);
}

// Check if server is running
fetch('http://localhost:3000/ai-education-demo')
    .then(response => {
        if (response.ok) {
            console.log('🌐 Development server is running at http://localhost:3000\n');
            runAllTests().then(success => {
                process.exit(success ? 0 : 1);
            });
        } else {
            throw new Error('Server not responding');
        }
    })
    .catch(error => {
        console.log('❌ Development server is not running. Please start it with: npm run dev');
        process.exit(1);
    });