#include "stdafx.h"
#include "CppUnitTest.h"

#include "../advent2018/CheckSummer.hpp"

using namespace Microsoft::VisualStudio::CppUnitTestFramework;
using namespace Advent2018;

namespace advent2018tests
{
    TEST_CLASS(CheckSummerTests)
    {
    public:
        TEST_METHOD(PartOneSampleInputGivesCorrectChecksum)
        {
            CheckSummer summer;
            summer.addBoxId("abcdef");
            summer.addBoxId("bababc");
            summer.addBoxId("abbcde");
            summer.addBoxId("abcccd");
            summer.addBoxId("aabcdd");
            summer.addBoxId("abcdee");
            summer.addBoxId("ababab");
            Assert::AreEqual(12u, summer.getChecksum());
        }
    };
}
