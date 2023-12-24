const About = () => {
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="bg-white w-[60vw] p-5 rounded-md">
        <h1 className="text-4xl font-bold mb-4 text-center my-2">
          Welcome to HomeChef!
        </h1>
        <div className="flex flex-col gap-3 my-2">
          <h3 className="text-xl font-bold text-center">About Us</h3>
          <p className="text-gray-600">
            At HomeChef, we believe that cooking should be a delightful and
            rewarding experience. Our web app is designed to make your culinary
            journey exciting and stress-free. Whether you're a seasoned chef or
            a beginner in the kitchen, HomeChef is here to inspire and assist
            you on your cooking adventures.
          </p>
        </div>
        <div className="flex flex-col gap-3 my-2">
          <h3 className="text-xl font-bold text-center">What is HomeChef?</h3>
          <p className="text-gray-600">
            HomeChef is a user-friendly web app that simplifies the process of
            finding the perfect recipe based on your available ingredients. We
            understand the challenges of meal planning and strive to make it as
            convenient as possible for you. With our intuitive interface and
            access to the Meal DB API, we bring a world of delicious recipes
            right to your fingertips.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
