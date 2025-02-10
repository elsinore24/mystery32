import { supabase } from './supabase';

export async function uploadImage(file, suspectId, fileName) {
  if (!file || !suspectId || !fileName) {
    console.error('Upload validation failed:', { file: !!file, suspectId, fileName });
    throw new Error('Missing required parameters for upload');
  }

  try {
    const path = `${suspectId}/${fileName}`;
    console.log('Starting upload process:', {
      path,
      fileSize: file.size,
      fileType: file.type,
      lastModified: file.lastModified,
      suspectId
    });

    const { data, error } = await supabase.storage
      .from('suspects')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error('Supabase upload error details:', error);
      throw error;
    }

    console.log('Upload completed successfully:', {
      data,
      path,
      fullPath: data?.path,
      id: data?.id
    });
    return data;
  } catch (error) {
    console.error('Upload process failed:', error);
    throw new Error(`Upload failed: ${error.message}`);
  }
}

export async function getImageUrl(path) {
  if (!path) {
    throw new Error('Path is required');
  }

  try {
    console.log('Getting public URL for:', path);
    const { data: { publicUrl }, error } = await supabase.storage
      .from('suspects')
      .getPublicUrl(path);
    
    if (error) {
      throw error;
    }

    if (!publicUrl) {
      throw new Error('No public URL returned');
    }

    console.log('Public URL generated:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('Failed to get image URL:', error);
    throw error;
  }
}

export async function deleteImage(path) {
  if (!path) {
    throw new Error('Path is required');
  }

  try {
    const { data, error } = await supabase.storage
      .from('suspects')
      .remove([path]);
    
    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Delete operation error:', error);
    throw error;
  }
}

export async function listSuspectImages(suspectId) {
  if (!suspectId) {
    throw new Error('Suspect ID is required');
  }

  try {
    const { data, error } = await supabase.storage
      .from('suspects')
      .list(suspectId);
    
    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('List operation error:', error);
    throw error;
  }
}
