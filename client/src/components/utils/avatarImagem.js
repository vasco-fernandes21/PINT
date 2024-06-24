import * as React from 'react';
import Avatar from '@mui/material/Avatar';

export default function AvatarImagem({ src, alt, sx }) {
  return <Avatar alt={alt} src={src} sx={sx} />;
}