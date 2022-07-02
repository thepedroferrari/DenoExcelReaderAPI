import { Application, Router } from 'https://deno.land/x/oak@v10.6.0/mod.ts';
import { oakCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts';
// @deno-types="https://deno.land/x/sheetjs@v0.18.3/types/index.d.ts"
import * as XLSX from 'https://deno.land/x/sheetjs@v0.18.3/xlsx.mjs';

// @deno-types="https://deno.land/x/sheetjs@v0.18.3/types/index.d.ts"
import * as cptable from 'https://deno.land/x/sheetjs@v0.18.3/dist/cpexcel.full.mjs';
XLSX.set_cptable(cptable);

const router = new Router();
const app = new Application();
app.use(oakCors()); // Enable CORS for All Routes
app.use(router.routes()); // Enable reading routes

const filedata = Deno.readFileSync('bank.xlsx');
const workbook = XLSX.read(filedata, { type: 'buffer' });

//const workbook = XLSX.read(filedata, { type: 'buffer' });

console.log(filedata);

router.get('/xls/:name', (context) => {
  if (context.params && context.params.name) {
    context.response.body = {
      success: true,
      msg: filedata,
    };
  } else {
    context.response.body = {
      success: false,
      msg: 'Failed to do stuff',
    };
  }
});

console.info('CORS-enabled web server listening on port 8080');
await app.listen({ port: 8080 });
