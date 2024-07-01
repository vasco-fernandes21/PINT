import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon
} from 'react-share';
import { Button, Menu, MenuItem, IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';

const BotoesPartilha = ({ url, title }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton aria-controls="share-menu" aria-haspopup="true" onClick={handleClick}>
        <ShareIcon />
      </IconButton>
      <Menu
        id="share-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <FacebookShareButton url={url} quote={title}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <TwitterShareButton url={url} title={title}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <WhatsappShareButton url={url} title={title} separator=": ">
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default BotoesPartilha;
