#include <unordered_map>
#include <unordered_set>
#include <string>
#include <vector>

namespace Advent2018
{
	class RecipeScorer
    {
    public:
		//typedef std::vector<int> ScoreBoard;
		typedef std::string ScoreBoard;
		//typedef std::unordered_set<unsigned> SomeSet;
		//typedef std::unordered_map<unsigned, unsigned> SomeMap;

		RecipeScorer(size_t firstElfCurrentIndex = 0,
				     size_t secondElfCurrentIndex = 1,
				     const char *field3 = "",
				     int dummy = 0) :
			m_firstElfCurrentIndex(firstElfCurrentIndex),
			m_secondElfCurrentIndex(secondElfCurrentIndex),
			m_field3(field3),
			m_dummy(dummy)
		{
			m_scoreBoard.push_back('3');
			m_scoreBoard.push_back('7');
        }

        void getTenScoresAfterSkipping(int numScoresToSkip, std::string& tenScores)
        {
			while (m_scoreBoard.size() < numScoresToSkip + 10)
			{
				updateScoreBoard();
			}
			tenScores.empty();
			for (size_t i = numScoresToSkip; i < numScoresToSkip + 10; ++i)
			{
				tenScores += m_scoreBoard[i];
			}
		}

		void getNumScoresSkipped(const std::string& scoresToFind, int& scoresSkipped)
        {
			size_t foundIndex = 0;
			do
			{
				updateScoreBoard();
				auto size = m_scoreBoard.size();
				if (size % 1000 == 0) std::cout << size << "iterations...";
				if (size > 10 * 1000 * 1000) break;
			} while ((foundIndex = m_scoreBoard.find(scoresToFind)) == std::string::npos);
			scoresSkipped = (int)foundIndex;
        }

		void updateScoreBoard()
		{
			addNewScoresToBoard();
			advanceElf(m_firstElfCurrentIndex, m_scoreBoard[m_firstElfCurrentIndex] - '0' + 1, m_scoreBoard.size());
			advanceElf(m_secondElfCurrentIndex, m_scoreBoard[m_secondElfCurrentIndex] - '0' + 1, m_scoreBoard.size());
		}

		void advanceElf(size_t& elfIndex, int numSteps, size_t boardSize)
		{
			elfIndex += numSteps;
			elfIndex %= boardSize;
		}

		void addNewScoresToBoard()
		{
			auto firstScore = -1, secondScore = -1;
			makeNewScores(m_scoreBoard[m_firstElfCurrentIndex] - '0', m_scoreBoard[m_secondElfCurrentIndex] - '0',
						  firstScore, secondScore);
			m_scoreBoard.push_back((char)firstScore + '0');
			if (secondScore >= 0) m_scoreBoard.push_back((char)secondScore + '0');
		}

		void makeNewScores(int firstCurrentScore, int secondCurrentScore,
						   int& firstNewScore, int& secondNewScore)
		{
			auto sum = firstCurrentScore + secondCurrentScore;
			firstNewScore = sum / 10;
			secondNewScore = sum % 10;
			if (firstNewScore == 0)
			{
				firstNewScore = secondNewScore;
				secondNewScore = -1;
			}
		}

		size_t getFirstElfCurrentIndex() { return m_firstElfCurrentIndex; }
		size_t getSecondElfCurrentIndex() { return m_secondElfCurrentIndex; }
		const char *getField3() { return m_field3.c_str(); }
		const ScoreBoard& getScoreBoard() { return m_scoreBoard; }

    private:
		size_t m_firstElfCurrentIndex;
		size_t m_secondElfCurrentIndex;
		std::string m_field3;
		int m_dummy;

		ScoreBoard m_scoreBoard;
        //SomeSet m_someSet;
        //SomeMap m_someMap;
    };
}
