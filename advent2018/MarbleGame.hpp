#include <iostream>
#include <list>
#include <vector>

namespace Advent2018
{
    class MarbleGame
    {
    public:
        MarbleGame() :
            m_numPlayers(0), m_lastMarble(0),
			m_currentPlayer(0), //m_indexOfCurrentMarble(0),
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
					//std::cout << currentMarble << " = " << currentMarble / 23 << " * 23" << std::endl;
					advanceCurrentPlayerScore(currentMarble);
					removeMarble(getMarbleIteratorCounterclockwise(7));
				}
				else
				{
					addMarbleBetweenTwo(currentMarble, getMarbleIteratorClockwise(1), getMarbleIteratorClockwise(2));
				}

				if (currentMarble % 100000 == 0) std::cout << currentMarble << " ";
				//logMarbles();
			}
			std::cout << std::endl;

			findWinningScore();
        }

		void logMarbles()
		{
			std::cout << "[" << getCurrentPlayer() << "] ";
			//auto itCurrent = iteratorAtIndex(m_marbles, m_indexOfCurrentMarble);
			for (auto it = m_marbles.begin(); it != m_marbles.end(); ++it)
			{
				auto isCurrent = (it == m_iteratorOfCurrentMarble);
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

		void removeMarble(std::list<unsigned>::iterator iteratorToRemove)
		{
			//auto it = iteratorAtIndex(m_marbles, indexToRemove);
			advanceCurrentPlayerScore(*iteratorToRemove);
			m_iteratorOfCurrentMarble = m_marbles.erase(iteratorToRemove);
			//m_indexOfCurrentMarble = ((indexToRemove == m_marbles.size()) ? 0 : indexToRemove);
		}

		void addMarbleBetweenTwo(unsigned marbleToAdd, std::list<unsigned>::iterator beforeIt, std::list<unsigned>::iterator afterIt)
		{
			auto indexOfLast = m_marbles.size() - 1;
			if (beforeIt == --(m_marbles.end()) && afterIt == m_marbles.begin())
			{
				addMarbleToEnd(marbleToAdd);
			}
			else
			{
				addMarbleToMiddle(marbleToAdd, afterIt);
			}
		}

		void addMarbleToEnd(unsigned marbleToadd)
		{
			m_marbles.push_back(marbleToadd);
			//m_indexOfCurrentMarble = m_marbles.size() - 1;
			m_iteratorOfCurrentMarble = --(m_marbles.end());
			// NOW DON'T NEED TO!  m_reverseIteratorOfCurrentMarble = m_marbles.rbegin();
		}

		void addMarbleToMiddle(unsigned marbleToAdd, std::list<unsigned>::iterator iteratorToAddBefore)
		{
			//auto it = iteratorAtIndex(m_marbles, indexToAddBefore);
			m_iteratorOfCurrentMarble = m_marbles.insert(iteratorToAddBefore, marbleToAdd);
			//m_indexOfCurrentMarble = indexToAddBefore;
			// CAN'T DO THIS, AND NOW DON'T NEED TO!  m_reverseIteratorOfCurrentMarble = m_iteratorOfCurrentMarble;
		}

		//std::list<unsigned>::iterator iteratorAtIndex(std::list<unsigned>& list, size_t index)
		//{
		//	auto it = list.begin();
		//	for (size_t i = 0; i < index; ++i, ++it);
		//	return it;
		//}

		//size_t getMarbleIndexFromCurrent(int offset)
		//{
		//	auto targetIndex = (int)m_indexOfCurrentMarble + offset;
		//	auto validIfNonNegativeResult = targetIndex % m_marbles.size();
		//	//if (offset == -7 && targetIndex >= 0)
		//	//{
		//	//	std::cout << "m_indexOfCurrentMarble = " << m_indexOfCurrentMarble << " (-7)-> " << targetIndex;
		//	//	std::cout << ", modulo size of " << m_marbles.size() << " is " << validIfNonNegativeResult << std::endl;
		//	//}
		//	if (targetIndex >= 0) return validIfNonNegativeResult;
		//	targetIndex += (int)m_marbles.size();
		//	//{
		//	//	std::cout << "m_indexOfCurrentMarble = " << m_indexOfCurrentMarble << " (-7)-> " << targetIndex;
		//	//	std::cout << "  since index underflowed" << std::endl;
		//	//}
		//	return targetIndex;
		//}

		std::list<unsigned>::iterator getMarbleIteratorClockwise(unsigned offset)
		{
			auto i = 0u;
			auto it = m_iteratorOfCurrentMarble;
			for (; i < offset && it != m_marbles.end(); ++i, ++it);
			if (i < offset)
			{
				it = --(m_marbles.begin());
				for (auto j = 0u; j < offset - i; ++j, ++it);
			}
			return it;
		}

		std::list<unsigned>::iterator getMarbleIteratorCounterclockwise(unsigned offset)
		{
			auto i = 0u;
			auto it = m_iteratorOfCurrentMarble;
			for (; i < offset && it != --(m_marbles.begin()); ++i, --it);
			if (i < offset)
			{
				it = m_marbles.end();
				for (auto j = 0u; j < offset - i; ++j, --it);
			}
			return it;
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
		//size_t getIndexOfCurrentMarble() { return m_indexOfCurrentMarble; }
		unsigned getWinningScore() { return m_winningScore; }

    private:
		//typedef std::vector<unsigned> Marbles;
		typedef std::list<unsigned> Marbles;
		typedef std::vector<unsigned> PlayerScores;

		unsigned m_numPlayers;
		unsigned m_lastMarble;
		unsigned m_currentPlayer;
		//size_t m_indexOfCurrentMarble;
		std::list<unsigned>::iterator m_iteratorOfCurrentMarble;
		//std::list<unsigned>::reverse_iterator m_reverseIteratorOfCurrentMarble;
		unsigned m_winningScore;

		Marbles m_marbles;
		PlayerScores m_playerScores;
    };
}
