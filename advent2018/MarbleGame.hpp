#include <iostream>
#include <unordered_map>
#include <unordered_set>
//#include <stdint.h>
#include <vector>

namespace Advent2018
{
    class MarbleGame
    {
    public:
        MarbleGame() :
            m_numPlayers(0), m_lastMarble(0),
			m_currentPlayer(0), m_indexOfCurrentMarble(0)
        {}

        void setNumPlayersAndLastMarble(unsigned numPlayers, unsigned lastMarble)
        {
			m_numPlayers = numPlayers;
			m_lastMarble = lastMarble;
		}

		void playGame()
        {
			std::cout << m_numPlayers << "," << m_lastMarble << std::endl;
			auto currentMarble = 0u;
			m_marbles.push_back(currentMarble);
			while (currentMarble < m_lastMarble)
			{
				++currentMarble;
				auto numMarbles = m_marbles.size();
				auto indexOneClockwise = (m_indexOfCurrentMarble + 1) % numMarbles;
				auto indexTwoClockwise = (m_indexOfCurrentMarble + 2) % numMarbles;
				auto indexOfLast = numMarbles - 1;
				if (indexOneClockwise == indexTwoClockwise
					|| indexOneClockwise == indexOfLast && indexTwoClockwise == 0)
				{
					m_marbles.push_back(currentMarble);
					m_indexOfCurrentMarble = indexOfLast;
				}
				else
				{
					auto it = m_marbles.begin();
					for (size_t i = 0; i < indexTwoClockwise; ++i, ++it);
					(void)m_marbles.insert(it, currentMarble);
					m_indexOfCurrentMarble = indexOneClockwise + 1;
				}
				m_currentPlayer = (m_currentPlayer + 1) % m_numPlayers;
			}
            //return m_numPlayers;
        }

		unsigned getNumPlayers() { return m_numPlayers; }
		unsigned getLastMarble() { return m_lastMarble; }
		unsigned getCurrentPlayer() { return m_currentPlayer + 1; }
		size_t getIndexOfCurrentMarble() { return m_indexOfCurrentMarble; }

    private:
        typedef std::vector<unsigned> Marbles;
        typedef std::unordered_set<unsigned> SomeSetType;
        typedef std::unordered_map<unsigned, unsigned> SomeMapType;

		unsigned m_numPlayers;
		unsigned m_lastMarble;
		unsigned m_currentPlayer;
		size_t m_indexOfCurrentMarble;
		Marbles m_marbles;
		//SomeVectorType m_someVector;
        //SomeSetType m_someSet;
        //SomeMapType m_someMap;
    };
}
