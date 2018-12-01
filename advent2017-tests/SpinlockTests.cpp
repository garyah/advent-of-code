#include "stdafx.h"
#include "CppUnitTest.h"

#include "../advent2017/Spinlock.hpp"

using namespace Microsoft::VisualStudio::CppUnitTestFramework;
using namespace Advent2017;

namespace advent2017tests
{
    TEST_CLASS(SpinlockTests)
    {
    public:
        TEST_METHOD(StepSize3ReturnsCorrectValueAfterLastInserted)
        {
            Assert::AreEqual(638u, Spinlock::SpinAndReturnValueAfterLastInserted(3));
        }

        TEST_METHOD(StepSize3ReturnsCorrectValueAfterFirst)
        {
            Assert::AreEqual(1222153u, Spinlock::SpinAndReturnValueAfterFirst(3));
        }
    };
}
