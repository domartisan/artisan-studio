// // pages/
// import generateFieldGroups from '@/utils/cms/generate';

// const data = await fetch(
//   'https://supabase-uum7d-u2635.vm.elestio.app/storage/v1/object/public/diagram/artisan/index.html'
// )

// const response = await data.text();

// const payload = {
//   meta: {
//     page: "myCustomPage",
//     sourceUrl: "https://myCustomPage.domartisan.com/myCustomPage",
//     type: "ACF",
//     template: true
//   },
//   html: response
// };


// export const get: APIRoute = ({params}) => {
//   const fieldGroups = generateFieldGroups(payload);

//   return new Response(JSON.stringify(fieldGroups), {
//     headers: {
//       'content-type': 'application/json'
//     },
//   });
// }