#include "stdafx.h"
#include "CppUnitTest.h"

#include "../advent2016/ViableNodePairCounter.hpp"

using namespace Microsoft::VisualStudio::CppUnitTestFramework;
using namespace Advent2016;

namespace advent2016tests
{
    TEST_CLASS(ViableNodePairCounterTests)
    {
    public:
        
        TEST_METHOD(NoNodes)
        {
            ViableNodePairCounter counter;
            counter.addNode("root@ebhq-gridcenter# df -h");
            counter.addNode("Filesystem              Size  Used  Avail  Use%");
            counter.countViable();
            Assert::AreEqual((float)0, (float)counter.getNumViable(), 0.f);
        }

        TEST_METHOD(NoViable)
        {
            ViableNodePairCounter counter;
            counter.addNode("/dev/grid/node-x0-y0     92T   68T    24T   73%");
            counter.addNode("/dev/grid/node-x1-y0     24T   0T     24T   0%");
            counter.countViable();
            Assert::AreEqual((float)0, (float)counter.getNumViable(), 0.f);
        }

        TEST_METHOD(OneViable)
        {
            ViableNodePairCounter counter;
            counter.addNode("/dev/grid/node-x0-y0     92T   68T    24T   73%");
            counter.addNode("/dev/grid/node-x1-y0     93T   25T    68T   27%");
            counter.countViable();
            Assert::AreEqual((float)1, (float)counter.getNumViable(), 0.f);
        }

        TEST_METHOD(TwoViable)
        {
            ViableNodePairCounter counter;
            counter.addNode("/dev/grid/node-x0-y0     92T   68T    24T   73%");
            counter.addNode("/dev/grid/node-x1-y0     92T   24T    68T   27%");
            counter.countViable();
            Assert::AreEqual((float)2, (float)counter.getNumViable(), 0.f);
        }

    };
}
