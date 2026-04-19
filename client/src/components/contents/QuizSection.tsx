import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import type { QuizQuestion as QuizQuestionType } from './types';
import { quizSectionStyle } from '../../styles/contents/ContentStyles';
import QuizQuestion from './QuizQuestion';

interface Props {
  questions: QuizQuestionType[];
}

const QuizSection: React.FC<Props> = ({ questions }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (questionIndex: number, optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const allAnswered = questions.every((_, index) => selectedAnswers[index] !== undefined);

  return (
    <Box sx={quizSectionStyle}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#0f172a' }}>
        Knowledge Check
      </Typography>
      <Typography variant="body1" sx={{ color: '#64748b', mb: 4 }}>
        Test your understanding of the concepts covered in this chapter.
      </Typography>

      {questions.map((question, index) => (
        <QuizQuestion
          key={index}
          question={question}
          index={index}
          selectedValue={selectedAnswers[index] ?? null}
          onSelect={(val) => handleSelect(index, val)}
          isSubmitted={isSubmitted}
        />
      ))}

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          variant="contained" 
          onClick={handleSubmit}
          disabled={!allAnswered || isSubmitted}
          sx={{ 
            px: 4, 
            py: 1.5, 
            borderRadius: 8,
            backgroundColor: '#3b82f6',
            fontWeight: 'bold',
            textTransform: 'none',
            fontSize: '1rem',
            '&:hover': {
              backgroundColor: '#2563eb',
            },
            '&.Mui-disabled': {
              backgroundColor: isSubmitted ? '#94a3b8' : '#e2e8f0',
              color: isSubmitted ? 'white' : '#94a3b8'
            }
          }}
        >
          {isSubmitted ? 'Submitted' : 'Check Answers'}
        </Button>
      </Box>
    </Box>
  );
};

export default QuizSection;
