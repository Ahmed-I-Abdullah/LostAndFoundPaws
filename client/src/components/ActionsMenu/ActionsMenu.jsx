import React, { useState } from "react";
import {
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Divider,
    IconButton,
    Typography,
    Box
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';

const UserMenu = ({ anchorEl, open, handleClose }) => {

    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
    const [openConfirmResolve, setOpenConfirmResolve] = useState(false);

    const handleDeleteConfirmed = () => {
        onDelete(petData.id);
        setOpenConfirmDelete(false); // Close the dialog
    };

    const handleResolveConfirmed = () => {
        onResolve(petData.id);
        setOpenConfirmResolve(false); // Close the dialog
    };

    return (
        <div>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        width: '20ch', // Adjust the width as needed
                    },
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Post Options
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        size="small"
                        sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                </Box>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Edit" />
                    {/*TODO Add sign in/sign out functionality*/}
                </MenuItem>
                <Divider></Divider>
                <MenuItem onClick={() => setOpenConfirmDelete(true)}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Delete" />
                    {/*TODO Add view post/comment functionality*/}
                </MenuItem>
                <Divider></Divider>
                <MenuItem onClick={() => setOpenConfirmResolve(true)}>
                    <ListItemIcon>
                        <CheckIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Mark as resolved" />
                    {/*TODO Add view post/comment functionality*/}
                </MenuItem>
            </Menu>

            {/* Use the ConfirmDialog for delete confirmation */}
            <ConfirmDialog
            open={openConfirmDelete}
            onClose={() => setOpenConfirmDelete(false)}
            onConfirm={handleDeleteConfirmed}
            title="Are you sure you want to delete this post?"
            isDelete={true}
            />

            {/* Use the ConfirmDialog for ignore confirmation */}
            <ConfirmDialog
            open={openConfirmResolve}
            onClose={() => setOpenConfirmResolve(false)}
            onConfirm={handleResolveConfirmed}
            title="Are you sure you want to mark this post as resolved?"
            isDelete={false}
            />
        </div>
    );
};

export default UserMenu;
