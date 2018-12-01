#include <vector>

namespace Advent2017
{
    enum VirusCarrierDirection
    {
        // specifically listed in clockwise order here
        Up,
        Right,
        Down,
        Left
    };

    class VirusCarrier
    {
    public:
        VirusCarrier() :
            m_carrierDirection(Up),
            m_carrierXPosition(0),
            m_carrierYPosition(0),
            m_numberInfectedByMoves(0)
        {
        }

        void addMapRow(const char *row)
        {
            if (m_grid.empty()) addPadRows(strlen(row));
            std::vector<bool> gridRow;
            for (size_t count = 0; count < pad_size; ++count)
                gridRow.push_back(false);
            for (const char *p = row; *p; ++p)
            {
                if (*p == '.') gridRow.push_back(false);
                if (*p == '#') gridRow.push_back(true);
            }
            for (size_t count = 0; count < pad_size; ++count)
                gridRow.push_back(false);
            m_grid.push_back(gridRow);
        }

        size_t getNumberOfGridNodes()
        {
            size_t numberOfGridNodes = 0;
            for (std::vector<std::vector<bool>>::iterator it = m_grid.begin();
                it != m_grid.end();
                ++it)
                numberOfGridNodes += it->size();
            return numberOfGridNodes;
        }

        void moveCarrier(size_t numberOfMoves)
        {
            addPadRows(getGridWidth());
            while (numberOfMoves--)
            {
                // assumption that grid is always odd width and height
                // making true center node always exist
                auto xIndex = (int)(getGridWidth() / 2) + m_carrierXPosition;
                auto yIndex = (int)(getGridHeight() / 2) + m_carrierYPosition;

                auto node = m_grid[yIndex][xIndex];
                if (node) m_carrierDirection = (VirusCarrierDirection)((unsigned)m_carrierDirection + 1 % 4);
                if (!node) m_carrierDirection = (VirusCarrierDirection)((unsigned)m_carrierDirection - 1 % 4);
                if (!node) ++m_numberInfectedByMoves;

                m_grid[yIndex][xIndex] = !node;
                m_carrierXPosition += (m_carrierDirection == Right) ? 1 : (m_carrierDirection == Left) ? -1 : 0;
                m_carrierYPosition += (m_carrierDirection == Down) ? 1 : (m_carrierDirection == Up) ? -1 : 0;
                // TODO: deal with overflow of grid
            }
        }

        size_t getNumberInfectedByMoves() { return m_numberInfectedByMoves; }

    private:
        void addPadRows(size_t rowLength)
        {
            std::vector<bool> padRow;
            for (size_t count = 0; count < (rowLength + pad_size * 2); ++count)
                padRow.push_back(false);
            for (size_t count = 0; count < pad_size; ++count)
                m_grid.push_back(padRow);
        }

        size_t getGridWidth()
        {
            // critical assumption that width of grid is size of any row,
            // in another words, grid is always square
            return m_grid[0].size();
        }

        size_t getGridHeight()
        {
            return m_grid.size();
        }

        const size_t pad_size = 5;
        std::vector<std::vector<bool>> m_grid;
        VirusCarrierDirection m_carrierDirection;
        int m_carrierXPosition, m_carrierYPosition;
        size_t m_numberInfectedByMoves;
    };
}
