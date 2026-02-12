import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const title = searchParams.get('title') || 'NEET Biology Coaching'
  const subtitle = searchParams.get('subtitle') || 'Cerebrum Biology Academy'
  const locality = searchParams.get('locality') || ''
  const stats = searchParams.get('stats') || '98% Success Rate | 695/720 Top Score'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0f172a',
          backgroundImage: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(74,93,74,0.3) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(34,197,94,0.2) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Top bar with branding */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            {/* Brain icon placeholder */}
            <div
              style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#4a5d4a',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: '32px' }}>🧠</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                }}
              >
                Cerebrum
              </span>
              <span
                style={{
                  fontSize: '16px',
                  color: '#94a3b8',
                  fontWeight: 500,
                }}
              >
                Biology Academy
              </span>
            </div>
          </div>

          {/* Badge */}
          <div
            style={{
              backgroundColor: '#22c55e',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '50px',
              fontSize: '18px',
              fontWeight: 700,
            }}
          >
            #1 NEET Biology
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Locality badge if present */}
          {locality && (
            <div
              style={{
                display: 'flex',
                marginBottom: '20px',
              }}
            >
              <span
                style={{
                  backgroundColor: 'rgba(250,204,21,0.2)',
                  color: '#fde047',
                  padding: '8px 20px',
                  borderRadius: '50px',
                  fontSize: '20px',
                  fontWeight: 600,
                  border: '1px solid rgba(250,204,21,0.3)',
                }}
              >
                📍 {locality}
              </span>
            </div>
          )}

          {/* Title */}
          <h1
            style={{
              fontSize: locality ? '56px' : '64px',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.1,
              margin: 0,
              marginBottom: '20px',
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '28px',
              color: '#94a3b8',
              margin: 0,
              marginBottom: '32px',
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </p>

          {/* Stats bar */}
          <div
            style={{
              display: 'flex',
              gap: '32px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span
                style={{
                  fontSize: '40px',
                  fontWeight: 800,
                  color: '#22c55e',
                }}
              >
                98%
              </span>
              <span
                style={{
                  fontSize: '18px',
                  color: '#94a3b8',
                }}
              >
                Success Rate
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span
                style={{
                  fontSize: '40px',
                  fontWeight: 800,
                  color: '#facc15',
                }}
              >
                695
              </span>
              <span
                style={{
                  fontSize: '18px',
                  color: '#94a3b8',
                }}
              >
                /720 Top Score
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span
                style={{
                  fontSize: '40px',
                  fontWeight: 800,
                  color: '#a855f7',
                }}
              >
                1,50,000+
              </span>
              <span
                style={{
                  fontSize: '18px',
                  color: '#94a3b8',
                }}
              >
                Students
              </span>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '32px',
            borderTop: '1px solid rgba(148,163,184,0.2)',
          }}
        >
          <span
            style={{
              fontSize: '20px',
              color: '#64748b',
            }}
          >
            cerebrumbiologyacademy.com
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#25D366',
              padding: '12px 24px',
              borderRadius: '50px',
            }}
          >
            <span style={{ fontSize: '20px' }}>💬</span>
            <span
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#ffffff',
              }}
            >
              Book Free Demo
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
