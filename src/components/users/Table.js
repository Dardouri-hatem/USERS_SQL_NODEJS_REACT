import React from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from "material-ui/Table";
import { Button } from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "../modal/modal";

const row = (x, i, header, deleteUser) => (
  <TableRow key={`tr-${i}`}>
    {header.map((y, k) => (
      <TableRowColumn key={k}>{x[y.prop]}</TableRowColumn>
    ))}
    <TableRowColumn>
      <Modal data={x} />
    </TableRowColumn>
    <TableRowColumn>
      <Button
        variant="danger"
        onClick={() => {
          deleteUser(x.id);
        }}
      >
        <DeleteIcon />
      </Button>
    </TableRowColumn>
  </TableRow>
);

export default ({ data, header, deleteUser }) => (
  <Table>
    <TableHeader>
      <TableRow>
        {header.map((x, i) => (
          <TableHeaderColumn key={i}>{x.name}</TableHeaderColumn>
        ))}
        <TableHeaderColumn />
        <TableHeaderColumn />
      </TableRow>
    </TableHeader>
    <TableBody>{data.map((x, i) => row(x, i, header, deleteUser))}</TableBody>
  </Table>
);
