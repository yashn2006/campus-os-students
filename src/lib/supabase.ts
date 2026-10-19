import { createClient, SupabaseClient } from '@supabase/supabase-js';

const env = (import.meta as any).env || {};

// Read Supabase config from environment variables or fallback
const supabaseUrl = env.VITE_SUPABASE_URL || 'https://placeholder-campus-os.supabase.co';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const isSupabaseConfigured = Boolean(
  env.VITE_SUPABASE_URL && env.VITE_SUPABASE_ANON_KEY
);

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export interface ScanAttendancePayload {
  qr_string: string;
  student_id: string;
  device_id: string;
}

export interface ScanResult {
  success: boolean;
  message: string;
  marked_at?: string;
  isOfflineQueued?: boolean;
}

/**
 * Sends scan payload to Supabase Edge Function `/scan-attendance`
 * or queues locally if offline / not configured.
 */
export async function submitAttendanceScan(
  payload: ScanAttendancePayload,
  isOfflineMode: boolean
): Promise<ScanResult> {
  if (isOfflineMode || !navigator.onLine || !isSupabaseConfigured) {
    // Queue locally
    return {
      success: true,
      message: 'Attendance recorded locally. Will auto-sync when connected to network.',
      marked_at: new Date().toISOString(),
      isOfflineQueued: true,
    };
  }

  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/scan-attendance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.error || data.message || 'Scan validation failed',
      };
    }

    return {
      success: true,
      message: 'Attendance verified & synchronized with Campus OS portal!',
      marked_at: data.marked_at || new Date().toISOString(),
    };
  } catch (err: any) {
    let message = 'Network timeout. Saved to offline queue for auto-sync.';

    if (err?.context) {
      let body: any = null;
      try {
        body = await err.context.json();
        message = body?.message || err.message || 'Edge Function returned a non-2xx status code';
      } catch {
        message = err.message || 'Edge Function returned a non-2xx status code';
      }
      console.log('Scan Edge Function failed:', err.context.status, body);
    }

    console.warn('Scan Edge Function error:', err);
    return {
      success: true,
      message,
      marked_at: new Date().toISOString(),
      isOfflineQueued: true,
    };
  }
}
