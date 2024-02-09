import { useEffect } from 'react';
import ValidationService from 'src/services/ValidationService';

interface Props {
  title: string;
  artist: string;
  lyrics: string;
  setIsInputsValid: (value: boolean) => void;
}

export default function useUpdateValidator({
  title,
  artist,
  lyrics,
  setIsInputsValid
}: Props) {
  useEffect(() => {
    ValidationService.songValidator()
      .isValid({
        title: title,
        artist: artist,
        lyrics: lyrics
      })
      .then((valid) => {
        if (valid) {
          setIsInputsValid(true);
        } else {
          setIsInputsValid(false);
        }
      });
  }, [title, artist, lyrics]);
}
