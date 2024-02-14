import { Button } from '@mui/material';
import { DropzoneDialog } from 'material-ui-dropzone';
import { useState } from 'react';
import { useAsyncAction } from '../hooks/useAsyncAction';

export function FileUpload() {
  const [open, setOpen] = useState(false);

  const { trigger: uploadFile, loading } = useAsyncAction(
    async (files: File[]) => {
      // TODO: send the file to BE instead, this request to the Asprise API is going to be handled there.
      const formData = new FormData();
      formData.append('api_key', 'TEST');
      formData.append('recognizer', 'auto');
      formData.append('file', files[0]);

      const response = await fetch('https://ocr.asprise.com/api/v1/receipt', {
        method: 'POST',
        body: formData,
      });
      console.log(response.body);
    },
  );

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        disabled={loading}
      >
        {!loading ? 'Add Receipt' : 'Loading...'}
      </Button>

      <DropzoneDialog
        // TODO: Limit files to 1?
        acceptedFiles={['image/*']}
        cancelButtonText={'cancel'}
        submitButtonText={'submit'}
        maxFileSize={5000000}
        open={open}
        onClose={() => setOpen(false)}
        onSave={(files) => {
          setOpen(false);
          uploadFile(files);
        }}
        showPreviews={true}
        showFileNamesInPreview={true}
      />
    </>
  );
}