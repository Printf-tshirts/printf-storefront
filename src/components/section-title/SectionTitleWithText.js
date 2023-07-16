import PropTypes from "prop-types";
import clsx from "clsx";

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("welcome-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="welcome-content text-center">
          <h1>Welcome To PRINTCODER</h1>
          <p className="my-2">
            Welcome to Printcoder, where creativity meets fashion and
            individuality reigns supreme!
          </p>

          <p className="my-2">
            At Printcoder, we're all about celebrating your unique style and
            passions. We understand that you're not just another face in the
            crowd – you're an individual with your own quirks, interests, and
            sense of humor. That's why we've curated a collection that speaks
            directly to you, our amazing and diverse community.
          </p>

          <p className="my-2">
            Who are we, you ask? We're a team of enthusiastic creators and
            fashion enthusiasts, united by our love for out-of-the-box designs
            and trendy codes. We're obsessed with crafting t-shirts that are
            unlike anything you'll find elsewhere. Our artists pour their heart
            and soul into each design, ensuring that you're not just wearing a
            t-shirt, but a work of art that reflects your unique personality.
          </p>

          <p className="my-2">
            But it's not just about style for us – we're committed to delivering
            the highest quality products that stand the test of time. We
            carefully source premium materials to ensure that our t-shirts not
            only look great but feel great too. We believe that when you invest
            in a Printcoder tee, it should become a staple in your wardrobe, a
            go-to piece that brings a smile to your face every time you wear it.
          </p>

          <p className="my-2">
            And let's not forget about our amazing community of trendsetters and
            fashion-forward individuals – that's you! We're here to support you
            on your style journey, whether you're expressing your love for
            travel, food, science, or unleashing your inner pun master. Our goal
            is to create a space where you can freely embrace your passions,
            spark conversations, and turn heads wherever you go.
          </p>

          <p className="my-2">
            So, go ahead and explore our collection of one-of-a-kind designs.
            Each tee is a labor of love, handcrafted to make a statement and
            empower you to express yourself in the most fashionable way
            possible. Join us in our mission to redefine what it means to be
            stylish, unique, and unapologetically yourself.
          </p>

          <p className="my-2">
            Welcome to the Printcoder family – a community where trendy meets
            individuality, and where your style truly has no limits!
          </p>

          <p className="my-2">Stay stylish, stay unique!</p>

          <p className="my-2">
            <strong>The Printcoder Team</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default SectionTitleWithText;
