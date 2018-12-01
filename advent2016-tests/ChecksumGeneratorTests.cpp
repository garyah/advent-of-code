#include "stdafx.h"
#include "CppUnitTest.h"

#include "../advent2016/ChecksumGenerator.hpp"

using namespace Microsoft::VisualStudio::CppUnitTestFramework;
using namespace Advent2016;

namespace advent2016tests
{
    TEST_CLASS(ChecksumGeneratorTests)
    {
    public:
        
        TEST_METHOD(ExpandOneOneCorrect)
        {
            auto result = ChecksumGenerator::expand("1", 3);
            Assert::AreEqual("100", result.c_str());
        }

        TEST_METHOD(ExpandOneZeroCorrect)
        {
            auto result = ChecksumGenerator::expand("0", 3);
            Assert::AreEqual("001", result.c_str());
        }

        TEST_METHOD(ExpandFiveOnesCorrect)
        {
            auto result = ChecksumGenerator::expand("11111", 11);
            Assert::AreEqual("11111000000", result.c_str());
        }

        TEST_METHOD(ExpandMixedOnesZeroesCorrect)
        {
            auto result = ChecksumGenerator::expand("111100001010", 25);
            Assert::AreEqual("1111000010100101011110000", result.c_str());
        }

        TEST_METHOD(GenerateFromEvenStringCorrect)
        {
            auto result = ChecksumGenerator::generate("110010110100");
            Assert::AreEqual("100", result.c_str());
        }

        TEST_METHOD(GenerateFromOddStringCorrect)
        {
            auto result = ChecksumGenerator::generate("11001011010");
            Assert::AreEqual("11001011010", result.c_str());
        }

        TEST_METHOD(TestMethod16a1)
        {
            ChecksumGenerator generator;
            generator.expandAndGenerate("10000", 20);
            Assert::AreEqual("01100", generator.getChecksum());
        }

    };
}
