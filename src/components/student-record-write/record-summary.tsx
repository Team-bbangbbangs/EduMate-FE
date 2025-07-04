import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import Loading from '@/components/loading/loading';
import SaveSummaryRecordModal from '@/components/modal/save-summary-record-modal';
import { Textarea } from '@/components/textarea/textarea';
import { useGetSummaryRecordDetail } from '@/hooks/api/use-get-summary-record-detail';
import { usePostSummaryRecordDetail } from '@/hooks/api/use-post-summary-record-detail';
import { useAutoResizeTextarea } from '@/hooks/use-auto-resize-textarea';
import type { RecordType } from '@/types/api/student-record';
import { calculateByte } from '@/util/calculate-byte';

interface RecordSummaryProps {
  selectedId: number;
  recordType: RecordType;
}

export default function RecordSummary({ selectedId, recordType }: RecordSummaryProps) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [description, setDescription] = useState('');
  const { mutate: postSummaryRecordDetail } = usePostSummaryRecordDetail();
  const { data, isPending, isError } = useGetSummaryRecordDetail(selectedId);
  const { textareaRef, resizeTextarea } = useAutoResizeTextarea(description);
  const bytesLimit = recordType === 'career' ? 2100 : 1500;

  useEffect(() => {
    if (data) {
      setDescription(data.description || '');
    }
  }, [data]);

  const handleSave = () => {
    const byteCount = calculateByte(description);

    postSummaryRecordDetail(
      {
        recordId: selectedId,
        description,
        byteCount,
      },
      {
        onSuccess: () => {
          setModalOpen(true);
        },
        onError: (error) => {
          alert(error.message);
        },
      },
    );
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  if (isError) {
    router.push(`/write-${recordType}`);
  }
  if (isPending) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-2">
      <h4 className="font-bold">종합</h4>
      <Textarea
        ref={textareaRef}
        value={description}
        onChange={handleDescriptionChange}
        onInput={resizeTextarea}
        placeholder="완성본을 적어주세요."
        className="border-slate-400 p-5 placeholder:text-base placeholder:text-slate-400"
        style={{
          lineHeight: 'inherit',
          fontSize: 'inherit',
          overflow: 'hidden',
        }}
      />
      <div className="flex justify-end">
        <span
          className={`${bytesLimit < calculateByte(description) ? 'text-red-600' : 'text-slate-400'}`}
        >
          {calculateByte(description)}
        </span>
        <span className="text-slate-400">/{bytesLimit} Bytes</span>
      </div>
      <div className="flex justify-end">
        <button
          disabled={!description.trim()}
          className={`rounded-md px-4 pb-1.5 pt-2 text-white ${
            !description.trim()
              ? 'cursor-not-allowed bg-slate-400'
              : 'bg-slate-800 hover:bg-slate-950'
          }`}
          onClick={handleSave}
        >
          저장
        </button>
      </div>

      <SaveSummaryRecordModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}
