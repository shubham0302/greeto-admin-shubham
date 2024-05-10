import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC, ReactNode } from "react";

export type HeadData = {
  label: string;
  align?: "left" | "right" | "center";
};

export type TableCompProps = {
  headData: HeadData[];
  body: ReactNode;
  maxHeight?: string;
  isSticky?: boolean;
};

const TableComp: FC<TableCompProps> = (props) => {
  return (
    <TableContainer
      sx={{
        border: "1px solid",
        borderColor: "gray.100",
        borderRadius: 1,
        maxHeight: props?.maxHeight,
      }}
    >
      <Table size="medium" stickyHeader={props?.isSticky}>
        <TableHead>
          <TableRow>
            {props.headData?.map((item, index) => (
              <TableCell
                sx={{
                  bgcolor: "gray.800",
                  color: "gray.white",
                  fontWeight: "500",
                  fontSize: 15,
                }}
                key={index}
                align={item?.align}
              >
                {" "}
                {item?.label}{" "}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            "& tr:nth-child(odd)": {
              bgcolor: "gray.100",
            },
            "& tr": {
              fontSize: 15,
              fontWeight: "400",
              color: "gray.700",
            },
          }}
        >
          {props?.body}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComp;
