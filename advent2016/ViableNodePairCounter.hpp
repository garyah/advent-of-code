#include <stdio.h>
#include <string>
#include <vector>

namespace Advent2016
{
    class ViableNodePairCounter
    {
        typedef struct
        {
            unsigned size;
            unsigned used;
            unsigned avail;
            unsigned usedPercent;
        } Node;
        typedef std::vector<Node> Row;
        typedef std::vector<Row> Grid;

    public:
        ViableNodePairCounter() :
            m_grid(),
            m_numViable(0)
        {
        }

        void addNode(const char *input)
        {
            if (std::string(input).find("/dev/grid/") == std::string::npos) return;

            int x = -1, y = -1, size = -1, used = -1, avail = -1, usedPercent = -1;
            (void)sscanf(input, "/dev/grid/node-x%d-y%d%dT%dT%dT%d%%", &x, &y, &size, &used, &avail, &usedPercent);
            if (x >= 0 && y >= 0 && size >= 0 && used >= 0 && avail >= 0 && usedPercent >= 0)
            {
                Node node = { static_cast<unsigned>(size),static_cast<unsigned>(used), static_cast<unsigned>(avail), static_cast<unsigned>(usedPercent) };
                size_t rowIndex = static_cast<size_t>(y);
                size_t colIndex = static_cast<size_t>(x);
                //(void)printf("row=%zu,col=%zu,%u,%u,%u,%u\n", rowIndex, colIndex, node.size, node.used, node.avail, node.usedPercent);

                while (colIndex >= m_grid.size()) { m_grid.push_back(Row()); }
                auto& row = m_grid[colIndex];
                while (rowIndex >= row.size()) { row.push_back(Node()); }
                row[rowIndex] = node;
            }
        }

        void countViable()
        {
            // Ack!  O(N^2) algo to count viable
            for (const auto& row : m_grid)
            {
                for (const auto& node : row)
                {
                    if (0 == node.used) continue;
                    for (const auto& otherRow : m_grid)
                    {
                        for (const auto& otherNode : otherRow)
                        {
                            if (&node == &otherNode) continue;
                            if (otherNode.avail >= node.used) ++m_numViable;
                        }
                    }
                }
            }
        }

        unsigned getNumViable()
        {
            return m_numViable;
        }

    private:
        Grid m_grid;
        unsigned m_numViable;
    };
}
