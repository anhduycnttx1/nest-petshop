import { timeAgoHepler } from "../helpers";
import { IFPost } from "../types";
import { FaEllipsisV } from "react-icons/fa";
import { Avatar, Space, Button, Row, Image } from "antd";
import { MessageTwoTone, HeartTwoTone, StarTwoTone } from "@ant-design/icons";
import { useState } from "react";
type PostProps = {
  post: IFPost;
};

const CardPost = ({ post }: PostProps) => {
  const colorIcon = "#d1d5db";
  return (
    <div className="max-w-[500px] bg-white shadow-lg rounded-lg">
      <Space direction="vertical" className="px-5 py-4">
        <Row className="flex items-center justify-between">
          <Space className="flex items-center">
            <Avatar size={48} src={post.author.avt} />
            <div>
              <div className="font-medium">{post.author.displayName}</div>
              <div className="text-sm opacity-75">
                {timeAgoHepler(post.timeCreate)}
              </div>
            </div>
          </Space>
          <Button
            icon={<FaEllipsisV />}
            shape="circle"
            type="text"
            className="p-2 rounded-full cursor-pointer hover:bg-gray-100"
          />
        </Row>
        <TruncateDescPost desc={post.desc} />
        <Image
          className="object-cover object-center rounded-lg"
          width="100%"
          height="250px"
          src={post.image[0]}
          alt={`img post id ${post.id}`}
        />
      </Space>
      <Space
        className="w-full px-5 py-3"
        style={{ borderTop: "2px solid #f3f4f6" }}
      >
        <Avatar size={38} src={post.author.avt} />
        <input
          className="px-5 py-2 placeholder-gray-400 bg-gray-200 border border-none rounded-full outline-blue-400 focus:outline-1"
          placeholder="Add Commentar"
        />
        <div>
          <Button
            shape="circle"
            type="text"
            icon={<HeartTwoTone twoToneColor="#eb2f96" />}
          />
          <span className="text-sm font-medium opacity-75">
            {post.likeCount}
          </span>
        </div>
        <div>
          <Button
            shape="circle"
            type="text"
            icon={<MessageTwoTone twoToneColor={colorIcon} />}
          />
          <span className="text-sm font-medium opacity-75">
            {post.cmtCount}
          </span>
        </div>
        <div>
          <Button
            shape="circle"
            type="text"
            icon={<StarTwoTone twoToneColor={colorIcon} />}
          />
          <span className="text-sm font-medium opacity-75">
            {post.shareCount}
          </span>
        </div>
      </Space>
    </div>
  );
};

export default CardPost;

function TruncateDescPost(props: { desc: string }) {
  const [isCollapse, setIsCollapse] = useState<boolean>(true);
  const num = 100;
  const descCollapse =
    props.desc.length > num ? props.desc.slice(0, num - 1) + "..." : props.desc;
  return (
    <>
      {isCollapse ? (
        <span>
          <span>{descCollapse}</span>
          <Button
            shape="circle"
            type="link"
            onClick={() => setIsCollapse(!isCollapse)}
          >
            <span className="text-sm font-medium">Read Mode</span>
          </Button>
        </span>
      ) : (
        <span>{props.desc}</span>
      )}
    </>
  );
}
