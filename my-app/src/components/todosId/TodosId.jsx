import React from 'react'
import './todos.css';

import { AiOutlineCloseCircle } from 'react-icons/ai';
import { MdOutlineDone } from 'react-icons/md';

const TodosId = ({todos}) => {
  return (
    <><div className="tbl-header">
          <table cellPadding="0" cellSpacing="0" border="0">
              <thead>
                  <tr>
                      <th>#</th>
                      <th>User</th>
                      <th>Description</th>
                      <th>Completed</th>
                  </tr>
              </thead>
          </table>
      </div><div className="tbl-content">
              <table cellPadding="0" cellSpacing="0" border="0">
                  <tbody>
                      {todos.map(todo => (
                          <tr bgcolor={todo.completed ? "transparent" :  "#999999"} key={todo.id}>
                              <td>{todo.id}</td>
                              <td>{todo.userId}</td>
                              <td>{todo.title}</td>
                              {!todo.completed &&
                                  <>
                                      <td>
                                          <icon> <AiOutlineCloseCircle size={20} /> </icon>
                                      </td>
                                  </>}
                              {todo.completed &&
                                  <>
                                      <td>
                                          <icon> <MdOutlineDone size={20} /> </icon>
                                      </td>
                                  </>}

                          </tr>
                      ))}
                  </tbody>
              </table>
          </div></>
  )
}

export default TodosId