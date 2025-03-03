import Link from "next/link";
import classes from "./post-item.module.css";
import Image from "next/image";

function PostItem(props) {
  const { title, image, excerpt, date, slug } = props.post;

  // 'date' 값은 문자열 형태로 전달되며, 이를 JavaScript Date 객체로 변환하여
  // 'toLocaleDateString' 메서드를 사용해 원하는 형식(날짜, 월, 연도)으로 포맷합니다.
  // 여기서는 "월 일, 연도" 형태로 날짜가 표시됩니다.
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric", // 날짜의 '일' 부분을 숫자로 표시
    month: "long", // '월'은 전체 이름으로 표시 (예: January, February)
    year: "numeric",
  });

  // 'imagePath'는 게시글의 이미지 경로를 지정하는 변수입니다.
  // '/images/posts/${slug}/${image}' 형태로 경로를 만드는데,
  // slug는 각 게시글마다 고유한 식별자 역할을 하며, 이미지 파일은 해당 slug 폴더 안에 저장됩니다.
  // 예를 들어, 'slug'가 'my-post'이고 이미지 파일명이 'post-image.jpg'라면,
  // imagePath는 '/images/posts/my-post/post-image.jpg'로 설정됩니다.
  const imagePath = `/images/posts/${slug}/${image}`;
  const linkPath = `/posts/${slug}`;

  return (
    <li className={classes.post}>
      <Link href={linkPath}>
        <div className={classes.image}>
          <Image
            src={imagePath}
            alt={title}
            width={300}
            height={200}
            layout="responsive"
          />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <time>{formattedDate}</time>
          <p>{excerpt}</p>
        </div>
      </Link>
    </li>
  );
}

export default PostItem;
