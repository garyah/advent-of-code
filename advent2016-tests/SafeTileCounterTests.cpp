#include "stdafx.h"
#include "CppUnitTest.h"

#include "../advent2016/SafeTileCounter.hpp"

using namespace Microsoft::VisualStudio::CppUnitTestFramework;
using namespace Advent2016;

namespace advent2016tests
{
    TEST_CLASS(SafeTileCounterTests)
    {
    public:
        
        TEST_METHOD(TestMethod18a1)
        {
            SafeTileCounter counter;
            counter.countTiles("..^^.", 3);
            Assert::AreEqual((float)6, (float)counter.getNumberSafeTiles(), 0.f);
        }

        TEST_METHOD(TestMethod18a2)
        {
            SafeTileCounter counter;
            counter.countTiles(".^^.^.^^^^", 10);
            Assert::AreEqual((float)38, (float)counter.getNumberSafeTiles(), 0.f);
        }

        TEST_METHOD(OneRowCorrect)
        {
            SafeTileCounter counter;
            counter.countTiles(".^^.^.^^^^", 1);
            Assert::AreEqual((float)3, (float)counter.getNumberSafeTiles(), 0.f);
        }

    };
}
