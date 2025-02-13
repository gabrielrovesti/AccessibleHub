import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const AccessibilityMasteryScreen = () => {
  const { colors, textSizes, isDarkMode } = useTheme();
  const [score, setScore] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);

  const quizData = [
    {
      question: 'Which WCAG guideline focuses on making content perceivable?',
      options: ['Operable', 'Perceivable', 'Understandable', 'Robust'],
      answer: 'Perceivable',
    },
    {
      question: 'What should you provide for non-text content?',
      options: [
        'Captions',
        'Color contrast',
        'Text alternatives',
        'Keyboard support',
      ],
      answer: 'Text alternatives',
    },
    {
      question: 'Which of the following is NOT a requirement for keyboard accessibility?',
      options: [
        'All functionality is available from a keyboard',
        'No keyboard trap',
        'Touchscreen gestures',
        'Logical tab order',
      ],
      answer: 'Touchscreen gestures',
    },
  ];

  const handleAnswer = (selectedOption) => {
    if (selectedOption === quizData[quizIndex].answer) {
      setScore((prevScore) => prevScore + 10);
    }
    setQuizIndex((prevIndex) => prevIndex + 1);
  };

  const resetQuiz = () => {
    setScore(0);
    setQuizIndex(0);
  };

  const themedStyles = {
    container: {
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.surface,
      borderBottomColor: colors.border,
    },
    headerTitle: {
      color: colors.text,
    },
    sectionTitle: {
      color: colors.text,
    },
    sectionDescription: {
      color: colors.textSecondary,
    },
    scoreContainer: {
      backgroundColor: colors.primary,
    },
    scoreText: {
      color: colors.background,
    },
    quizContainer: {
      backgroundColor: colors.surface,
    },
    questionText: {
      color: colors.text,
    },
    optionButton: {
      backgroundColor: colors.primaryLight,
    },
    optionButtonText: {
      color: colors.primary,
    },
    resetButton: {
      backgroundColor: colors.primary,
    },
    resetButtonText: {
      color: colors.background,
    },
  };

  return (
    <ScrollView style={[styles.container, themedStyles.container]}>
      <View style={[styles.header, themedStyles.header]}>
        <Text style={[styles.headerTitle, themedStyles.headerTitle]}>
          Accessibility Mastery
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={[styles.sectionTitle, themedStyles.sectionTitle]}>
          Test Your Knowledge
        </Text>
        <Text style={[styles.sectionDescription, themedStyles.sectionDescription]}>
          Challenge yourself with our accessibility quiz and track your progress. Each correct answer earns you 10 points. Can you achieve a perfect score?
        </Text>

        <View style={[styles.scoreContainer, themedStyles.scoreContainer]}>
          <Text style={[styles.scoreText, themedStyles.scoreText]}>
            Your Score: {score}
          </Text>
        </View>

        {quizIndex < quizData.length ? (
          <View style={[styles.quizContainer, themedStyles.quizContainer]}>
            <Text style={[styles.questionText, themedStyles.questionText]}>
              {quizData[quizIndex].question}
            </Text>
            <View style={styles.optionsContainer}>
              {quizData[quizIndex].options.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[styles.optionButton, themedStyles.optionButton]}
                  onPress={() => handleAnswer(option)}
                >
                  <Text style={[styles.optionButtonText, themedStyles.optionButtonText]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.resultContainer}>
            <Text style={[styles.resultText, { color: colors.text }]}>
              Quiz Complete!
            </Text>
            <Text style={[styles.resultText, { color: colors.text }]}>
              Your Final Score: {score} / {quizData.length * 10}
            </Text>
            <TouchableOpacity
              style={[styles.resetButton, themedStyles.resetButton]}
              onPress={resetQuiz}
            >
              <Text style={[styles.resetButtonText, themedStyles.resetButtonText]}>
                Take Quiz Again
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sectionDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  scoreContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quizContainer: {
    borderRadius: 12,
    padding: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  optionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultContainer: {
    alignItems: 'center',
    gap: 12,
  },
  resultText: {
    fontSize: 18,
  },
  resetButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AccessibilityMasteryScreen;