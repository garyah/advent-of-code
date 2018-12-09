#include <iostream>
//#include <unordered_map>
//#include <unordered_set>
//#include <stdint.h>
#include <vector>

namespace Advent2018
{
    class MarbleGame
    {
    public:
        MarbleGame() :
            m_numPlayers(0), m_lastMarble(0),
			m_currentPlayer(0), m_indexOfCurrentMarble(0),
			m_winningScore(0)
        {}

        void setNumPlayersAndLastMarble(unsigned numPlayers, unsigned lastMarble)
        {
			m_numPlayers = numPlayers;
			m_lastMarble = lastMarble;
			(void)m_playerScores.empty();
			for (size_t i = 0; i < numPlayers; ++i) m_playerScores.push_back(0);
		}

		void playGame()
        {
			auto currentMarble = 0u;
			m_marbles.push_back(currentMarble);
			m_currentPlayer = m_numPlayers - 1;
			//std::cout << "[-] (0)" << std::endl;
			while (currentMarble < m_lastMarble)
			{
				++currentMarble;
				advanceCurrentPlayer();

				if (isMarbleMultipleOfSpecialValue(currentMarble))
				{
					advanceCurrentPlayerScore(currentMarble);
					removeMarble(getMarbleIndexFromCurrent(-7));
				}
				else
				{
					addMarbleBetweenTwo(currentMarble, getMarbleIndexFromCurrent(1), getMarbleIndexFromCurrent(2));
				}

				//logMarbles();
			}

			findWinningScore();
        }

		void logMarbles()
		{
			std::cout << "[" << getCurrentPlayer() << "] ";
			auto itCurrent = iteratorAtIndex(m_marbles, m_indexOfCurrentMarble);
			for (auto it = m_marbles.begin(); it != m_marbles.end(); ++it)
			{
				auto isCurrent = (it == itCurrent);
				std::cout << (isCurrent ? "(" : "") << *it << (isCurrent ? ")" : "") << " ";
			}
			std::cout << std::endl;
		}

		void findWinningScore()
		{
			m_winningScore = 0u;
			for (auto it = m_playerScores.cbegin(); it != m_playerScores.cend(); ++it)
			{
				if (*it > m_winningScore) m_winningScore = *it;
			}
		}

		void removeMarble(size_t indexToRemove)
		{
			auto it = iteratorAtIndex(m_marbles, indexToRemove);
			advanceCurrentPlayerScore(*it);
			(void)m_marbles.erase(it);
			m_indexOfCurrentMarble = ((indexToRemove == m_marbles.size()) ? 0 : indexToRemove);
		}

		void addMarbleBetweenTwo(unsigned marbleToAdd, unsigned beforeIndex, unsigned afterIndex)
		{
			auto indexOfLast = m_marbles.size() - 1;
			if (beforeIndex == indexOfLast && afterIndex == 0)
			{
				addMarbleToEnd(marbleToAdd);
			}
			else
			{
				addMarbleToMiddle(marbleToAdd, afterIndex);
			}
		}

		void addMarbleToEnd(unsigned marbleToadd)
		{
			m_marbles.push_back(marbleToadd);
			m_indexOfCurrentMarble = m_marbles.size() - 1;
		}

		void addMarbleToMiddle(unsigned marbleToAdd, size_t indexToAddBefore)
		{
			auto it = iteratorAtIndex(m_marbles, indexToAddBefore);
			(void)m_marbles.insert(it, marbleToAdd);
			m_indexOfCurrentMarble = indexToAddBefore;
		}

		std::vector<unsigned>::iterator iteratorAtIndex(std::vector<unsigned>& vector, size_t index)
		{
			auto it = vector.begin();
			for (size_t i = 0; i < index; ++i, ++it);
			return it;
		}

		size_t getMarbleIndexFromCurrent(int offset)
		{
			auto targetIndex = (int)m_indexOfCurrentMarble + offset;
			auto validIfNonNegativeResult = targetIndex % m_marbles.size();
			if (targetIndex >= 0) return validIfNonNegativeResult;
			return validIfNonNegativeResult + 2;
		}

		void advanceCurrentPlayerScore(unsigned scoreToAdd)
		{
			m_playerScores[m_currentPlayer] += scoreToAdd;
		}

		bool isMarbleMultipleOfSpecialValue(unsigned marble)
		{
			return (marble / 23 * 23 == marble);
		}

		void advanceCurrentPlayer()
		{
			m_currentPlayer = (m_currentPlayer + 1) % m_numPlayers;
		}

		unsigned getNumPlayers() { return m_numPlayers; }
		unsigned getLastMarble() { return m_lastMarble; }
		unsigned getCurrentPlayer() { return m_currentPlayer + 1; }
		size_t getIndexOfCurrentMarble() { return m_indexOfCurrentMarble; }
		unsigned getWinningScore() { return m_winningScore; }

    private:
		typedef std::vector<unsigned> Marbles;
		typedef std::vector<unsigned> PlayerScores;
		//typedef std::unordered_set<unsigned> SomeSetType;
        //typedef std::unordered_map<unsigned, unsigned> SomeMapType;

		unsigned m_numPlayers;
		unsigned m_lastMarble;
		unsigned m_currentPlayer;
		size_t m_indexOfCurrentMarble;
		unsigned m_winningScore;

		Marbles m_marbles;
		PlayerScores m_playerScores;
		//SomeVectorType m_someVector;
        //SomeSetType m_someSet;
        //SomeMapType m_someMap;
    };
}
