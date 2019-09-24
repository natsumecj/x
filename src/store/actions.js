// import { GET_CITY } from "./mutation-types";
// import axios from "../http";
// import moment from "dayjs"
// export default {
//   async getCity({ commit }) {
//     try {
//       let res = await axios.req("api/topics");
//       console.log(res.data);
//       commit(GET_CITY, res.data);
//       res.data.map(item=>{
//         let time=moment(item.last_reply_at).valueOf()
//         let time1=(new Date()).valueOf()
//         console.log(time1);
//         console.log(time);
//         item.hours=parseInt((time1-time)/1000/60/60)
//       })
//       console.log(res.data);
//     } catch (e) {
//       console.log(e);
//     }
//   }
// };
