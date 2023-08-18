import React, { useState } from "react";

// 저장된 텍스트 편집

interface Props {
  text: string;
}

const EditableText: React.FC<Props> = ({ text }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedText(event.target.value);
  };

  const handleSaveClick = () => {
    setIsEditing(false);

    // 이후에 수정된 값(editedText)을 처리하는 로직 추가 가능
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input type="text" value={editedText} onChange={handleInputChange} />
          <button onClick={handleSaveClick}>저장</button>
        </div>
      ) : (
        <div>
          <span>{editedText}</span>
          <button onClick={handleEditClick}>편집</button>
        </div>
      )}
    </div>
  );
};

export default EditableText;
