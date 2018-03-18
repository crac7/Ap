'use strict'
const oracledb = require('.././dataBase/conexion');

/*****************************************Metodos*************************************************/
const AlumnosDiscapacidad=(req, res)=> {//consulta cita sp_crm_consulta
  oracledb.getConnection((err, conn)=> {
    conn.execute(
          'select * from SAED_DISCAPACIDAD',
          {}, //no binds
          {
              resultSet: true,
              prefetchRows: 10000,
               outFormat: oracledb.OBJECT // pones  el encabezdo con el value
          },
         (err, result)=> {
                             if (err) {
                               console.error(err.message);
                               return;
                             }
                             else{
                                  fetchRowsFromRS(conn, result.resultSet, 10000, res);
                             }
                         }
     );
  });
}

const NotasAlumnos=(req, res)=> {//consulta cita sp_crm_consulta
  oracledb.getConnection((err, conn)=> {
    conn.execute(
          'select * from saed_nota',
          {}, //no binds
          {
              resultSet: true,
              prefetchRows: 10000,
               outFormat: oracledb.OBJECT // pones  el encabezdo con el value
          },
         (err, result)=> {
                             if (err) {
                               console.error(err.message);
                               return;
                             }
                             else{
                                  fetchRowsFromRS(conn, result.resultSet, 10000, res);
                             }
                         }
     );
  });
}
const Materias=(req, res)=> {//consulta cita sp_crm_consulta
  oracledb.getConnection((err, conn)=> {
    conn.execute(
          'select * from SAED_MATERIAS',
          {}, //no binds
          {
              resultSet: true,
              prefetchRows: 10000,
               outFormat: oracledb.OBJECT // pones  el encabezdo con el value
          },
         (err, result)=> {
                             if (err) {
                               console.error(err.message);
                               return;
                             }
                             else{
                                  fetchRowsFromRS(conn, result.resultSet, 10000, res);
                             }
                         }
     );
  });
}
////***************** esta funcion es para cuando se retorna grancatidad de datos**************************////
const fetchRowsFromRS=( connection, resultSet, numRows, res)=>{
  let rowsProcessed = 0;
  let startTime;
   startTime = Date.now();

  resultSet.getRows( // get numRows rows
      numRows,
      (err, rows)=>{
        if (err) {
          console.error(err);
          doClose(connection, resultSet);   // always close the ResultSet
                                 // close the ResultSet and release the connection
        }
        else if (rows.length > 0) {   // got some rows
           console.log("fetchRowsFromRS(): Got " + rows.length + " rows");
            res.status(200).send(rows);           // process rows
                if (rows.length === numRows) { // might be more rows
                  fetchRowsFromRS(connection, resultSet, numRows);
                }
                else{
                  doClose(connection, resultSet); // always close the ResultSet
                }
         console.log('Total time (in seconds):', ((Date.now() - startTime)/1000));
                                        // got fewer rows than requested so must be at end
                                       // close the ResultSet and release the connection
        } else {                        // else no rows
             doClose(connection, resultSet);   // always close the ResultSet                    // close the ResultSet and release the connection
        }
      });

}

//Cerar la conexion si algo sale mal
function doRelease(connection)
{
  connection.close(
    function(err)
    {
      if (err) { console.error(err.message); }
    });
}

function doClose(connection, resultSet)
{
  resultSet.close(
    function(err)
    {
      if (err) { console.error(err.message); }
      doRelease(connection);
    });
}

module.exports = {
    AlumnosDiscapacidad,
    NotasAlumnos,
    Materias
}
