const oracledb = require('oracledb');
const config = require('./config');



oracledb.createPool (config.BaseDatosConfig,
  function(err, pool)
  {
            if (err) {
              console.error(err);
              console.log("aqui")
              return;
            }
            else{
              //   console.dir('Bien hecho Ya te conectaste con OracleDB ;)')En caso que algo no funcione borra prueba conexcion
                  console.log(pool.poolAlias); // 'default'
/*********************************Prueba conexcion*********************************/
                  pool.getConnection (
                        function(err, connection)
                        {
                          if (err) {
                            console.error(err.message);
                            console.log("aqui")
                            return;
                          }
                         else{
                               console.dir('Bien hecho Ya te conectaste con OracleDB ;)')
                             }

                        });
/********************************Fin******************************************/
          }
     }
);

module.exports = oracledb;
