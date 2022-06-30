import React, { useState } from "react";
// import { useParams } from "react-router";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useSelector, useDispatch } from "react-redux";

const PostReview = () => {
  //   const userMongo = useSelector((state) => state.userMongo);
  //   const currentUser = useSelector((state) => state.user);
  //   const userId = useSelector((state) => state.user.id);
  //   const movieId = useSelector((state) => state.movie.id);

  //   let { id } = useParams();
  //   const [review, setReview] = useState({
  //     user: {userId}, // email del cliente
  //     comment: "",
  //     movie: {movieId},
  //   });

  //   function handleChange(e) {
  //     setReview({
  //       ...review,
  //       comment: e.target.value,
  //     });
  //   }

  // async function handleSubmit(e) {
  //     e.preventDefault();
  //     console.log(review);
  //     try {
  //       await axios.post("http://localhost:3001/review/create", review);
  //       Swal.fire("", "Muchas gracias por tu comentario", "success");
  //     } catch (err) {
  //       console.log(err);
  //       Swal.fire(
  //         "",
  //         "Lo sentimos, solo puedes dejar una opinión por película",
  //         "error"
  //       );
  //     }
  //     setReview({
  //       user: userId,
  //       comment: "",
  //       movie: movieId,
  //     });
  //   }

  return (
    <div className="colDejatureview">
      {/* <form onSubmit={handleSubmit}> */}
      <form>
        <div className="contenedorTextArea mx5">
          <textarea
            // onChange={(e) => handleChange(e)}
            className="form-control textarea p-1 mb-2"
            placeholder="Deja tu opinión sobre esta película"
            // value={review.comment}
            rows="4"
          ></textarea>
        </div>
        <div className="text-end">
          <button
            className="btn btn-warning mt-0 btnEnviarReview"
            type="submit"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostReview;
