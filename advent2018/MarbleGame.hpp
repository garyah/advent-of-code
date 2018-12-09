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
            m_numPlayers(0),
			m_lastMarble(0)
        {
        }

        void method1(unsigned numPlayers, unsigned lastMarble)
        {
			m_numPlayers = numPlayers;
			m_lastMarble = lastMarble;
		}

		unsigned method2()
        {
			std::cout << m_numPlayers << "," << m_lastMarble << std::endl;
            return m_numPlayers;
        }

		unsigned getNumPlayers() { return m_numPlayers; }
		unsigned getLastMarble() { return m_lastMarble; }

    private:
        typedef std::vector<unsigned> SomeVectorType;
        typedef std::unordered_set<unsigned> SomeSetType;
        typedef std::unordered_map<unsigned, unsigned> SomeMapType;

		unsigned m_numPlayers;
		unsigned m_lastMarble;
		//SomeVectorType m_someVector;
  //      SomeSetType m_someSet;
  //      SomeMapType m_someMap;
    };
}
