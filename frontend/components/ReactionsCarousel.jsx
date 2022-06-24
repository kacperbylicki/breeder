export const ReactionsCarousel = ({ reactions }) => {
  const ReactionCarouselItem = (reaction) => (
    <div className="carousel-item">
      <div className="avatar">
        <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src="https://api.lorem.space/image/face?hash=3174" alt={reaction} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="carousel carousel-center max-w-md mx-2 my-6 p-4 space-x-6 bg-neutral rounded-box">
      {reactions?.map((reaction, index) => (
        <ReactionCarouselItem key={index} reaction={reaction} />
      ))}
    </div>
  );
};
