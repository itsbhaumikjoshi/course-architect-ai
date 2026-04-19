import React from 'react';
import { Box, Typography, Radio, FormControlLabel } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import type { QuizQuestion as QuizQuestionType } from './types';
import { quizQuestionCardStyle } from '../../styles/contents/ContentStyles';

interface Props {
  question: QuizQuestionType;
  index: number;
  selectedValue: number | null;
  onSelect: (value: number) => void;
  isSubmitted: boolean;
}

const QuizQuestion: React.FC<Props> = ({ question, index, selectedValue, onSelect, isSubmitted }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#0f172a' }}>
        {index + 1}. {question.question}
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {question.options.map((option, optIndex) => {
          const isSelected = selectedValue === optIndex;
          let isCorrect: boolean | null = null;

          if (isSubmitted) {
            if (optIndex === question.correct_option_idx) {
              isCorrect = true;
            } else if (isSelected) {
              isCorrect = false;
            }
          }

          let icon = <RadioButtonUncheckedIcon />;
          let checkedIcon = <RadioButtonCheckedIcon />;
          
          if (isSubmitted) {
            if (isCorrect === true) {
              icon = <CheckCircleIcon sx={{ color: '#22c55e' }} />;
              checkedIcon = icon;
            } else if (isCorrect === false && isSelected) {
              icon = <CancelIcon sx={{ color: '#ef4444' }} />;
              checkedIcon = icon;
            }
          }

          return (
            <Box 
              key={optIndex} 
              onClick={() => !isSubmitted && onSelect(optIndex)}
              sx={quizQuestionCardStyle(isSelected, isCorrect)}
            >
              <FormControlLabel
                value={optIndex}
                control={
                  <Radio 
                    checked={isSelected}
                    icon={icon}
                    checkedIcon={checkedIcon}
                    sx={{ 
                      color: isSubmitted && isCorrect === true ? '#22c55e' : isSubmitted && isCorrect === false ? '#ef4444' : undefined,
                      '&.Mui-checked': {
                        color: isSubmitted && isCorrect === true ? '#22c55e' : isSubmitted && isCorrect === false ? '#ef4444' : '#3b82f6',
                      }
                    }}
                  />
                }
                label={
                  <Typography sx={{ 
                    color: isSubmitted && isCorrect === true ? '#166534' : isSubmitted && isCorrect === false && isSelected ? '#991b1b' : '#334155',
                    fontWeight: isSelected ? 600 : 400
                  }}>
                    {option}
                  </Typography>
                }
                sx={{ m: 0, width: '100%', pointerEvents: 'none' }}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default QuizQuestion;
