"use client";

import { useParams } from "next/navigation";
import { MAX_SOLPLACE_LOG_PICTURES } from "@/constants/solplaceLog";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { VisitedLogInputType } from "@/types/input/inputType";
import { useRouter } from "next/navigation";
import { usePhoto } from "@/hooks/usePhoto";
import { useSolplaceLogMutation } from "@/hooks/useSolplaceLogMutation";
import { useSolplaceLogData } from "@/hooks/useSolplaceLogData";
import { modalState } from "@/recoils/modalState";
import { useRecoilState } from "recoil";

import InputField from "@/components/common/Input/InputLoginField";
import ModalField from "@/components/common/Modal/ModalField";
import ButtonMediumField from "@/components/common/Button/ButtonMediumField";
import InputTextAreaField from "@/components/common/Input/InputTextAreaField";
import PhotoCard from "@/components/solplace/Log/PhotoCard";

const SolplaceUpdatePage = () => {
  const [modal, setModal] = useRecoilState(modalState);
  const params = useParams();
  const router = useRouter();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const { data, loading, error } = useSolplaceLogData(params.id);
  const { handleSubmit, register, watch, reset } = useForm<VisitedLogInputType>(
    {
      defaultValues: {
        title: "",
        content: "",
      },
    }
  );
  const { photos, setPhotos, handleAddPhoto, handleRemovePhoto } = usePhoto();
  const { handleUpdate, handleDelete } = useSolplaceLogMutation(params.id);

  const title = watch("title");
  const content = watch("content");

  useEffect(() => {
    if (data) {
      const photosProps = JSON.parse(data.fetchSolplaceLogById.images);
      setPhotos(photosProps);
      reset({
        title: data.fetchSolplaceLogById.solplaceName,
        content: data.fetchSolplaceLogById.introduction,
      });
    }
  }, [data]);

  useEffect(() => {
    if (title && content && photos.length > 0) setIsButtonEnabled(true);
    else setIsButtonEnabled(false);
  }, [title, content, photos]);

  if (loading) return "Loading...";
  if (error) return `Error! ${error}`;

  return (
    <>
      <ModalField
        message={modal.message}
        buttonMessage={modal.buttonMessage}
        isVisible={modal.isVisible}
        onClose={() => {
          setModal({ ...modal, isVisible: false });
          router.back();
        }}
      />
      <div className="w-full p-4">
        <div className="flex items-center mb-2">
          <div className="text-sm font-semibold text-gray-500">
            솔플레이스 사진
          </div>
          <div className="ml-2 text-sm text-gray-500">
            {photos.length}/{MAX_SOLPLACE_LOG_PICTURES}
          </div>
        </div>
        <PhotoCard
          photos={photos}
          onAddPhoto={handleAddPhoto}
          onRemovePhoto={handleRemovePhoto}
        />
      </div>
      <div>
        <form className="flex flex-col py-2">
          <div className="mx-4 my-3">
            <InputField
              label="다녀온 솔플레이스"
              type="text"
              placeholder="솔플레이스를 선택해 주세요"
              register={register("title")}
            />
          </div>
          <div className="mx-4 my-3">
            <InputTextAreaField
              label="솔플 노트"
              placeholder="취향에 맞는 장소였나요? 공간의 분위기, 꿀팁 등 혼자 방문하기 좋은 이유를 기록해 보세요."
              register={register("content")}
            />
          </div>
          <div className="flex gap-2 fixed bottom-12 w-full px-4">
            <ButtonMediumField
              onClick={handleSubmit(() => handleDelete())}
              enabled={false}
              text="로그 삭제"
              type="submit"
            />
            <ButtonMediumField
              onClick={handleSubmit(() => handleUpdate(content, photos))}
              enabled={isButtonEnabled}
              text="로그 수정"
              type="submit"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SolplaceUpdatePage;
