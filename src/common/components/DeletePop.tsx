import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { FC } from "react";
import SFButton from "./Button";

type DeletePopProps = {
  open: boolean;
  close: () => void;
  name?: string;
  content?: string;
  deleteFunc?: () => void;
  isLoading?: boolean;
};

const DeletePop: FC<DeletePopProps> = (props) => {
  return (
    <Dialog open={props?.open} onClose={props.close}>
      <DialogTitle>Delete?</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure, you delete <strong>{props?.name}</strong>? One's you
          delete the course it will never come back!
        </Typography>
      </DialogContent>
      <DialogActions>
        <SFButton variant="contained" sfColor="sp" onClick={props.close}>
          Cancel
        </SFButton>
        <Button
          variant="contained"
          color="error"
          onClick={props?.deleteFunc}
          disabled={props?.isLoading}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePop;
